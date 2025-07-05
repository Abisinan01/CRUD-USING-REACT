import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const SignWithJwt = (username, id, role) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not found in environment variables.");
    }
    const token = jwt.sign({ username, id }, secret, { expiresIn: '1h' });
    return token;
};
