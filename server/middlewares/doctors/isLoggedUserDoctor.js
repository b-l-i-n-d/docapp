import mongoose from 'mongoose';
import { doctorsModel } from '../../components/doctors/index.js';

const isLoggedUserDoctor = async (req, res, next) => {
    const userId = res.locals.data._id;
    const { doctorId, count } = req.query;

    if (doctorId && !count) {
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                error: 'Invalid doctor id',
            });
        }

        const isDoctor = await doctorsModel.findById(doctorId);

        if (isDoctor.userId.toString() !== userId) {
            return res.status(403).json({ error: 'You are forbidden.' });
        }
    }

    return next();
};

export default isLoggedUserDoctor;
