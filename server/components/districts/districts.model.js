import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
    division_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bn_name: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        required: true,
    },
});

const District = mongoose.model('District', districtSchema);

export default District;
