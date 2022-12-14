import mongoose from 'mongoose';

const chamberSchema = mongoose.Schema({
    time: {
        type: Array,
        required: true,
    },
    activeDay: {
        type: [String],
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

const doctorSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
            enum: ['Dr.', 'Prof. Dr.', 'Assoc. Prof. Dr.', 'Asst. Prof. Dr.'],
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other'],
        },
        presentAddress: {
            type: String,
            required: true,
        },
        nationalId: {
            type: Number,
            trim: true,
            required: true,
            unique: true,
        },
        bmdcRegNo: {
            type: Number,
            trim: true,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true,
        },
        specialized: {
            type: String,
            required: true,
        },
        workplace: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        chamber: {
            type: chamberSchema,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending',
            enum: ['decilend', 'pending', 'approved'],
        },
    },
    {
        timestamops: true,
    }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
