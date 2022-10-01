import mongoose from 'mongoose';

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
            type: Boolean,
            default: false,
            enum: [false, true],
        },
        isVerified: {
            type: Boolean,
            default: false,
            enum: [false, true],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
