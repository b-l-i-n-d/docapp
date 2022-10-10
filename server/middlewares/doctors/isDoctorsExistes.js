import { doctorsModel } from '../../components/doctors/index.js';

const isDoctorExists = async (req, res, next) => {
    const { email } = req.user;

    try {
        const existingDoctor = await doctorsModel.findOne({ email }).lean();

        if (existingDoctor) {
            return res.status(404).json({ error: 'Docotors already exists with this email.' });
        }

        return next();
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

export default isDoctorExists;
