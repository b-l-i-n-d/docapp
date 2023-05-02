import mongoose from 'mongoose';

const workplaceSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
    },
    orgCode: {
        type: String,
        required: true,
    },
    agency: {
        type: String,
    },
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    upazila: {
        type: String,
    },
    orgType: {
        type: String,
        required: true,
    },
    orgFunction: {
        type: String,
    },
    orgLevel: {
        type: String,
    },
    mobileNumber: {
        type: Number,
    },
    email: {
        type: String,
    },
    approvedBedNumber: {
        type: Number,
    },
    developmentBedNumber: {
        type: Number,
    },
    revenueBedNumber: {
        type: Number,
    },
    electricitySource: {
        type: String,
    },
});

workplaceSchema.index({ orgName: 'text' });

const Workplace = mongoose.model('Workplace', workplaceSchema);

export default Workplace;
