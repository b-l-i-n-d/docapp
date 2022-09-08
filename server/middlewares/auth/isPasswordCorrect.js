import { helpers } from '../../utils/index.js';

const isPasswordCorrect = async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;

    try {
        const isPasswordMatched = await helpers.verifyBcrypt(password, user.password);

        if (!isPasswordMatched) {
            return res.status(409).json({ error: 'Your credentials are not correct.' });
        }

        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

export default isPasswordCorrect;
