import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const userSchema = mongoose.Schema(
    {
        name: {
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
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        },
        isDoctor: {
            type: String,
            default: 'no',
            enum: ['no', 'pending', 'yes'],
        },
        isVerified: {
            type: Boolean,
            default: false,
            enum: [false, true],
        },
        seenNotification: {
            type: [notificationSchema],
            required: true,
            default: [],
        },
        unSeenNotification: [
            {
                content: {
                    type: String,
                    required: true,
                },
                timestamps: {
                    type: Date,
                    required: true,
                    default: new Date(),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
