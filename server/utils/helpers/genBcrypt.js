import bcrypt from 'bcryptjs';

const genBcrypt = async (data) => {
    const genSalt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(data, genSalt);

    return hashPassword;
};

export default genBcrypt;
