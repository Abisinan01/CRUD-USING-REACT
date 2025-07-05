import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
export const VerifyAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            res.json({ isLoggedIn: false });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodeToken ", decodeToken);
        req.user = decodeToken;
        if (!decodeToken) {
            res.json({ message: 'Access deniend', isLoggedIn: false });
        }
        next();
    }
    catch (error) {
        console.error("admin auth failed", error);
        return res.status(500).redirect('/');
    }
};
