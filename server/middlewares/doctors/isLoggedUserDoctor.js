import { doctorsModel } from '../../components/doctors/index.js';

const isLoggedUserDoctor = async (req, res, next) => {
    const userId = res.locals.data._id;
    const { doctorId } = req.query;

    if (doctorId) {
        const isDoctor = await doctorsModel.findById(doctorId);

        if (isDoctor.userId.toString() !== userId) {
            return res.status(403).json({ error: 'You are forbidden.' });
        }
    }

    return next();
};

export default isLoggedUserDoctor;
