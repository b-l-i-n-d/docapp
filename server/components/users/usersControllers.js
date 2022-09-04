import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './usersModel.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ result: existingUser, token });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const result = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
            expiresIn: '24h',
        });

        return res.status(200).json({ result, token });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' });
    }
};
