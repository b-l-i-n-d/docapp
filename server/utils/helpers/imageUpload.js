import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../../configs/index.js';

cloudinary.config({
    cloud_name: cloudinaryConfig.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinaryConfig.CLOUDINARY_API_KEY,
    api_secret: cloudinaryConfig.CLOUDINARY_API_SECRET,
});

export default async function imageUpload(file, id) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            public_id: id,
            folder: 'docapp/doctors',
        });
        return result;
    } catch (error) {
        return error;
    }
}
