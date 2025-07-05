import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const SignWithJwt = (username: string, id: string, role:string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET not found in environment variables.");
    }

    const token = jwt.sign(
        { username, id , role},
        secret,
        { expiresIn: '1h' }
    );
    return token;
};

