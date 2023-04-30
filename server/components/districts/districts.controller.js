import mongoose from 'mongoose';
import District from './districts.model.js';

const getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find().lean();
        return res.status(200).json(districts);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getDistrictById = async (req, res) => {
    const { id: districtId } = req.params;

    try {
        const district = await District.findById(districtId).lean();

        if (!district) {
            return res.status(404).json({
                error: 'District not found',
            });
        }

        return res.status(200).json(district);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const updateDistrictById = async (req, res) => {
    const { id: districtId } = req.params;
    const { name } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(districtId)) {
            return res.status(400).json({
                error: 'Invalid district id',
            });
        }

        const district = await District.findById(districtId).lean();

        if (!district) {
            return res.status(404).json({
                error: 'District not found',
            });
        }

        const updatedDistrict = await District.findByIdAndUpdate(
            districtId,
            {
                name: name || district.name,
            },
            { new: true }
        ).lean();

        return res.status(200).json(updatedDistrict);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default { getAllDistricts, getDistrictById, updateDistrictById };
