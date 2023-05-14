import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { cookiesConfig, jwtConfig, urlConfig } from '../../configs/index.js';
import { helpers } from '../../utils/index.js';
import { tokensModel } from '../tokens/index.js';
import User from './users.model.js';

const login = async (req, res) => {
    const { user } = req;

    try {
        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                isDoctor: user.isDoctor,
            },
            jwtConfig.ACCESS_SECRET,
            { expiresIn: jwtConfig.ACCESS_EXP }
        );

        const refreshToken = jwt.sign({ _id: user._id }, jwtConfig.REFRESH_SECRET, {
            expiresIn: jwtConfig.REFRESH_EXP,
        });

        res.cookie(cookiesConfig.access.name, accessToken, cookiesConfig.access.options);

        res.cookie(cookiesConfig.refresh.name, refreshToken, cookiesConfig.refresh.options);

        return res.status(200).json({
            isAuth: true,
            data: {
                accessToken: cookiesConfig.access.name,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await helpers.genBcrypt(password);

    try {
        const result = await User.create({
            name,
            email,
            password: hashPassword,
            role: 'user',
            isDoctor: 'no',
            seenNotification: [],
            unSeenNotification: [],
        });

        const accessToken = jwt.sign(
            {
                _id: result._id,
                email: result.email,
                name: result.name,
                role: result.role,
                isDoctor: result.isDoctor,
            },
            jwtConfig.ACCESS_SECRET,
            {
                expiresIn: jwtConfig.ACCESS_EXP,
            }
        );

        const refreshToken = jwt.sign({ _id: result._id }, jwtConfig.REFRESH_SECRET, {
            expiresIn: jwtConfig.REFRESH_EXP,
        });

        res.cookie(cookiesConfig.access.name, accessToken, cookiesConfig.access.options);

        res.cookie(cookiesConfig.refresh.name, refreshToken, cookiesConfig.refresh.options);

        return res.status(200).json({
            isAuth: true,
            data: {
                accessToken: cookiesConfig.access.name,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const logout = async (req, res) => {
    res.cookie(cookiesConfig.access.name, '(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)', cookiesConfig.access.delete);

    res.cookie(cookiesConfig.refresh.name, '(☞ﾟヮﾟ)☞☜(ﾟヮﾟ☜)', cookiesConfig.refresh.delete);

    res.status(200).json({
        isAuth: false,
        message: 'You have been logged out.',
    });
};

const verifyToken = async (req, res) => {
    const response = helpers.tokenResponse(res.locals.accessToken);

    return res.status(200).json({ ...response });
};

const getNotifications = async (req, res) => {
    const userId = res.locals.data._id;
    const limit = parseInt(req.query.limit, 10);

    try {
        let notificationData = null;
        if (limit < 0) {
            return res.status(400).json({ error: 'Invalid limit.' });
        }
        if (limit === 0) {
            notificationData = [];
        }
        if (limit > 0) {
            notificationData = await User.findById(userId)
                .select('unSeenNotification seenNotification')
                .slice('unSeenNotification', limit)
                .slice('seenNotification', limit)
                .lean();
        }
        if (!limit) {
            notificationData = await User.findById(userId)
                .select('unSeenNotification seenNotification')
                .lean();
        }

        return res.status(200).json(notificationData);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const updateNotifications = async (req, res) => {
    const userId = res.locals.data._id;
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ error: 'No notification found.' });
        }

        const pulledNotfication = await User.findById(userId, {
            unSeenNotification: { $elemMatch: { _id } },
        }).lean();

        const notificationData = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { unSeenNotification: { _id } },
                $push: { seenNotification: { ...pulledNotfication.unSeenNotification[0] } },
            },
            { new: true, safe: true }
        )
            .select('unSeenNotification seenNotification')
            .lean();

        return res.status(200).json(notificationData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const deleteNotification = async (req, res) => {
    const userId = res.locals.data._id;
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ error: 'No notification found.' });
        }

        const notificationData = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { seenNotification: { _id } },
            },
            { new: true, safe: true }
        )
            .select('unSeenNotification seenNotification')
            .lean();

        return res.status(200).json(notificationData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('name email role isDoctor').lean();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    // get url path from req
    const url = req.originalUrl.split('/').pop();
    console.log(url);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found.' });
        }

        const token = await tokensModel.findOne({ userId: user._id });
        if (token) {
            await token.deleteOne();
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await helpers.genBcrypt(resetToken);

        const newToken = await tokensModel.create({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        });

        const link = `${urlConfig.CLIENT_URL}/reset-password?token=${resetToken}&id=${newToken.userId}`;
        const sentEmail = await helpers.sendEmail(
            email,
            'Password Reset Request',
            { name: email, link },
            'utils/helpers/email/templates/requestChangePassword.handlebars'
        );

        if (sentEmail) {
            return res.status(200).json({ message: 'Email sent.' });
        }
        return res.status(500).json({ error: 'Something went wrong.' });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const resetPassword = async (req, res) => {
    const { password, token, userId } = req.body;

    try {
        const passwordResetToken = await tokensModel.findOne({ userId });
        if (!passwordResetToken) {
            return res.status(404).json({ error: 'Invalid or expired password reset token' });
        }

        const isValid = await helpers.verifyBcrypt(token, passwordResetToken.token);
        if (!isValid) {
            return res.status(404).json({ error: 'Invalid or expired password reset token' });
        }

        const hash = await helpers.genBcrypt(password);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hash }, { new: true });

        const sentEmail = await helpers.sendEmail(
            updatedUser.email,
            'Password Reset Successfully',
            { name: updatedUser.name },
            'utils/helpers/email/templates/resetPassword.handlebars'
        );

        if (sentEmail && updatedUser) {
            await passwordResetToken.deleteOne();
            return res.status(200).json({ message: 'Password reset successfully.' });
        }
        return await passwordResetToken.deleteOne();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

export default {
    login,
    logout,
    signup,
    verifyToken,
    getNotifications,
    updateNotifications,
    deleteNotification,
    getAllUsers,
    requestPasswordReset,
    resetPassword,
};
