import bcrypt from 'bcrypt';
const saltRounds = 10;
export const HashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        console.log("Error Hashing password :", error);
    }
};
