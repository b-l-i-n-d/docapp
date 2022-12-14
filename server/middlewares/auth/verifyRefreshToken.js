import { userModel } from '../../components/users/index.js';
import { cookiesConfig, jwtConfig } from '../../configs/index.js';
import { helpers } from '../../utils/index.js';

const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies[cookiesConfig.refresh.name];

    if (!refreshToken) {
        return res.status(404).json({
            message: 'Please login.',
        });
    }

    const verifyToken = await helpers.verifyJWT(refreshToken, jwtConfig.REFRESH_SECRET);

    const userData = await userModel.findById(verifyToken.data._id).lean();
    if (!userData) {
        return res.status(404).json({ error: 'Your data is not found.' });
    }

    if (verifyToken.isExpired) {
        res.clearCookie(cookiesConfig.refresh.name);

        return res.status(401).json({
            message: 'Your session has been experied.',
        });
    }
    if (verifyToken.isSecretNotValid) {
        res.clearCookie(cookiesConfig.refresh.name);

        return res.status(406).json({
            message: 'Your credentials are invalid. Please try login.',
        });
    }

    res.locals.data = verifyToken.data;

    return next();
};

export default verifyRefreshToken;
