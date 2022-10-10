import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import { cloudinaryConfig, cookiesConfig, jwtConfig } from '../../configs/index.js';
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
            // return res.status(200).json({
            //     isAuth: true,
            //     data: {
            //         accessToken: cookiesConfig.access.name,
            //     },
            // });
            const admin = await userModel.findOne({ role: 'admin' }).lean();
            console.log(admin);

            return helpers.tokenResponse(accessToken);
        }

        return res.status(200).json(result);
    } catch (error) {
        await helpers.imageDelete(user._id);
        return res.status(500).json(error);
    }
};

export default { createDoctor };
