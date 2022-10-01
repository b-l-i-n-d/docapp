import jwt from 'jsonwebtoken';
import { cookiesConfig, jwtConfig } from '../../configs/index.js';
import { helpers } from '../../utils/index.js';
import User from './users.model.js';

const login = async (req, res) => {
    const { user } = req;

    try {
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, name: user.name, role: user.role },
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
        });

        const accessToken = jwt.sign(
            { _id: result._id, email: result.email, name: result.name, role: result.role },
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

export default { login, logout, signup, verifyToken };
