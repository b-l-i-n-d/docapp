import { userModel } from '../../components/users/index.js';

const isAdmin = async (req, res, next) => {
    const userId = res.locals.data._id;

    try {
        const user = await userModel.findById(userId).lean();

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'You are not authorized to access this route.' });
        }

        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

export default isAdmin;
