import bcrypt from 'bcryptjs';

const verifyBcrypt = (passoword, hashPassword) => {
    const isMatch = bcrypt.compare(passoword, hashPassword);

    return isMatch;
};

export default verifyBcrypt;
