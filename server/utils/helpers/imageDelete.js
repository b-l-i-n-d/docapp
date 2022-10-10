import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../../configs/index.js';

cloudinary.config({
    cloud_name: cloudinaryConfig.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinaryConfig.CLOUDINARY_API_KEY,
    api_secret: cloudinaryConfig.CLOUDINARY_API_SECRET,
});

export default async function imageDelete(id) {
    try {
        const result = await cloudinary.uploader.destroy(id);
        return result;
    } catch (error) {
        return error;
    }
}
