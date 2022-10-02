import mongoose from 'mongoose';

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
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'],
        },
        presentAddress: {
            type: String,
            required: true,
        },
        nationalId: {
            type: Number,
            required: true,
        },
        bmdcRegNo: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        chamber: {
            type: Object,
            required: true,
            startTime: {
                type: Date,
                required: true,
            },
            endTime: {
                type: Date,
                required: true,
            },
            activeDay: {
                type: [String],
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamos: true,
    }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
