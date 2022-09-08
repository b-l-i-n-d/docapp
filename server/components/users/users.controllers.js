import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookiesConfig, jwtConfig } from '../../configs/index.js';
import User from './users.model.js';

const login = async (req, res) => {
    const { user } = req;

    try {
        const accessToken = jwt.sign(
            { _id: user._id, email: user.email, name: user.name },
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
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const genSalt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, genSalt);

    try {
        console.log(hashPassword);
        const result = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const accessToken = jwt.sign(
            { _id: result._id, email: result.email, name: result.name },
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

export default { login, signup };
