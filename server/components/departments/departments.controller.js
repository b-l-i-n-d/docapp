import mongoose from 'mongoose';
import Department from './departments.model.js';

const createDepartment = async (req, res) => {
    const { name } = req.body;

    try {
        const department = await Department.create({ name });

        return res.status(201).json(department);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
            .populate('doctors', 'name')
            .select('name doctors')
            .lean();

        return res.status(200).json(departments);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const getDepartmentById = async (req, res) => {
    const { id: departmentId } = req.params;

    try {
        const department = await Department.findById(departmentId).lean();

        if (!department) {
            return res.status(404).json({
                error: 'Department not found',
            });
        }

        return res.status(200).json(department);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const updateDepartmentById = async (req, res) => {
    const { id: departmentId } = req.params;
    const { name } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            return res.status(400).json({
                error: 'Invalid department id',
            });
        }

        const department = await Department.findById(departmentId).lean();

        if (!department) {
            return res.status(404).json({
                error: 'Department not found',
            });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(
            departmentId,
            {
                name: name || department.name,
            },
            { new: true }
        ).lean();

        return res.status(200).json(updatedDepartment);
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const deleteDepartmentById = async (req, res) => {
    const { id: departmentId } = req.params;

    try {
        const deletdDepartment = await Department.findByIdAndDelete(departmentId);

        return res.status(200).json({
            message: 'Department has been deleted!',
            data: deletdDepartment,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

export default {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
};
