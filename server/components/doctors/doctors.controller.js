import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
    cloudinaryConfig,
    cookiesConfig,
    jwtConfig,
    notificationTypes,
} from '../../configs/index.js';
import { helpers } from '../../utils/index.js';
import { userModel } from '../users/index.js';
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
        return res.status(500).json({
            error: error.message,
        });
    }
};

const updateDoctor = async (req, res) => {
    const { id: doctorId } = req.params;
    const { title, name, image, presentAddress, department, specialized, workplace, chamber } =
        req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                error: 'Invalid doctor id',
            });
        }

        const doctor = await Doctor.findById(doctorId).lean();

        if (!doctor) {
            return res.status(404).json({
                error: 'Doctor not found',
            });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                title: title || doctor.title,
                name: name || doctor.name,
                image: image || doctor.image,
                presentAddress: presentAddress || doctor.presentAddress,
                department: department || doctor.department,
                specialized: specialized || doctor.specialized,
                workplace: workplace || doctor.workplace,
                chamber: chamber || doctor.chamber,
            },
            { new: true }
        ).lean();

        return res.status(200).json(updatedDoctor);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const updateDoctorStatus = async (req, res) => {
    const { id: doctorId } = req.params;
    const { status: doctorStatus } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                error: 'Invalid doctor id',
            });
        }

        const doctor = await Doctor.findById(doctorId).lean();

        if (!doctor) {
            return res.status(404).json({
                error: 'Doctor not found',
            });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            doctorId,
            {
                status: doctorStatus,
            },
            { new: true }
        ).lean();

        const user = await userModel.findById(updatedDoctor.userId).lean();

        const { unSeenNotification } = user;
        unSeenNotification.push({
            type: notificationTypes.DOCTOR_STATUS_UPDATE,
            message: `Your doctor account has been ${doctorStatus}.`,
            data: {
                doctorId: doctor._id,
                userId: user._id,
                name: doctor.name,
            },
            onClickPath: `/user/doctors`,
            createdAt: Date.now(),
        });

        await userModel
            .findByIdAndUpdate(
                user._id,
                {
                    unSeenNotification,
                    isDoctor: updatedDoctor.status === 'approved' ? updatedDoctor._id : 'no',
                },
                { new: true }
            )
            .lean();

        return res.status(200).json(updatedDoctor);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getDoctor = async (req, res) => {
    const userId = res.locals.data._id;
    const doctorId = req.params.id;

    try {
        if (doctorId) {
            if (!mongoose.Types.ObjectId.isValid(doctorId)) {
                return res.status(400).json({
                    error: 'Invalid doctor id',
                });
            }
        }

        const result = doctorId
            ? await Doctor.findById(doctorId).lean()
            : await Doctor.findOne({ userId }).lean();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const result = await Doctor.find({}).lean();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getApprovedDoctors = async (req, res) => {
    try {
        const result = await Doctor.find({ status: 'approved' })
            .select(
                '_id name title image doctorType bmdcRegNo department specialized workplace chamber'
            )
            .lean();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default {
    createDoctor,
    getDoctor,
    getAllDoctors,
    updateDoctor,
    updateDoctorStatus,
    getApprovedDoctors,
};
