import jwt from 'jsonwebtoken';
import { userModel } from '../../components/users/index.js';
import { cookiesConfig, jwtConfig } from '../../configs/index.js';
import { helpers } from '../../utils/index.js';

const verifyAccessToken = async (req, res, next) => {
    const accessToken = req.cookies[cookiesConfig.access.name];

    const verifyToken = await helpers.verifyJWT(accessToken, jwtConfig.ACCESS_SECRET);

    if (verifyToken.isExpired) {
        const userId = res.locals.data._id;
        const userData = await userModel
            .findById(userId)
            .select('_id name email role isDoctor')
            .lean();

        const encryptedData = await jwt.sign(userData, jwtConfig.ACCESS_SECRET, {
            expiresIn: jwtConfig.ACCESS_EXP,
        });

        res.cookie(cookiesConfig.access.name, encryptedData, {
            ...cookiesConfig.access.options,
            overwrite: true,
        });

        res.locals.accessToken = {
            isAuth: true,
            message: 'created new accessToken',
            data: {
                accessToken: cookiesConfig.access.name,
            },
        };
    } else if (verifyToken.isSecretNotValid) {
        res.clearCookie(cookiesConfig.access.name);

        return res.status(406).json({
            isAuth: false,
            error: 'Your credentials are invalid. Please try login again.',
        });
    }

    return next();
};

export default verifyAccessToken;
