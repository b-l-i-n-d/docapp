import mongoose from 'mongoose';

const appointmentsSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Types.ObjectId,
            ref: 'Doctor',
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['New', 'Follow Up', 'Report'],
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'Other'],
        },
        phone: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model('Appointment', appointmentsSchema);

export default Appointment;
