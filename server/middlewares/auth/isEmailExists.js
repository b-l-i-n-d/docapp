import { userModel } from '../../components/users/index.js';

const isEmailExists = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingUser = await userModel.findOne({ email }).lean();

        if (existingUser) {
            return res
                .status(404)
                .json({ error: 'This email already exists.', description: 'Use different email.' });
        }
        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

export default isEmailExists;
