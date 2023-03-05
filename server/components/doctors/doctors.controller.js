import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import {
    cloudinaryConfig,
    cookiesConfig,
    jwtConfig,
    notificationTypes,
} from '../../configs/index.js';
import { helpers } from '../../utils/index.js';
import { userModel } from '../users/index.js';
import User from '../users/users.model.js';
import Doctor from './doctors.model.js';

cloudinary.config({
    cloud_name: cloudinaryConfig.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinaryConfig.CLOUDINARY_API_KEY,
    api_secret: cloudinaryConfig.CLOUDINARY_API_SECRET,
});

const createDoctor = async (req, res) => {
    const { user } = req;
    const {
        title,
        name,
        dateOfBirth,
        image,
        gender,
        presentAddress,
        doctorType,
        nationalId,
        bmdcRegNo,
        department,
        specialized,
        workplace,
        chamber,
    } = req.body;

    try {
        const imageResult = image && (await helpers.imageUpload(image, user._id));

        const result = await Doctor.create({
            userId: user._id,
            title,
            name,
            dateOfBirth,
            image: imageResult.secure_url,
            gender,
            presentAddress,
            doctorType,
            nationalId,
            bmdcRegNo,
            email: user.email,
            department,
            specialized,
            workplace,
            chamber,
        });

        if (req.user.role === 'user') {
            const updatedUser = await userModel
                .findByIdAndUpdate(user._id, { isDoctor: 'pending' }, { new: true })
                .lean();

            const accessToken = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isDoctor: updatedUser.isDoctor,
                },
                jwtConfig.ACCESS_SECRET,
                { expiresIn: jwtConfig.ACCESS_EXP }
            );

            res.cookie(cookiesConfig.access.name, accessToken, {
                ...cookiesConfig.access.options,
                overwrite: true,
            });

            const admin = await userModel.findOne({ role: 'admin' }).lean();

            const { unSeenNotification } = admin;
            unSeenNotification.push({
                type: notificationTypes.NEW_DOCTOR_REQUEST,
                message: `${result.name} has requested for doctor account.`,
                data: {
                    doctorId: result._id,
                    userId: user._id,
                    name: result.name,
                },
                onClickPath: `/admin/doctors`,
                createdAt: Date.now(),
            });

            await userModel
                .findByIdAndUpdate(admin._id, { unSeenNotification }, { new: true })
                .lean();

            return res.status(200).json({
                isAuth: true,
                data: {
                    accessToken: cookiesConfig.access.name,
                },
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        await helpers.imageDelete(user._id);
        return res.status(500).json(error);
    }
};

const getDoctor = async (req, res) => {
    const userId = res.locals.data._id;

    try {
        const result = await Doctor.findOne({ userId }).lean();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getAllDoctors = async (req, res) => {
    const userId = res.locals.data._id;

    try {
        const user = await User.findOne({ userId }).lean();

        if (user.role === 'admin') {
            const result = await Doctor.find({}).lean();

            return res.status(200).json(result);
        }
        return res.status(200).json({ message: 'You are not authorized to access this route' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default { createDoctor, getDoctor, getAllDoctors };
