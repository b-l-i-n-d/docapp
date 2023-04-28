import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { cookiesConfig, jwtConfig } from '../../configs/index.js';
import { helpers } from '../../utils/index.js';
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

    try {
        const notificationData = await User.findById(userId)
            .select('unSeenNotification seenNotification')
            .lean();

        res.status(200).json(notificationData);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
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

export default {
    login,
    logout,
    signup,
    verifyToken,
    getNotifications,
    updateNotifications,
    deleteNotification,
    getAllUsers,
};
