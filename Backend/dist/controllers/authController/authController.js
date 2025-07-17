import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const isAuthenticated = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        console.log("JWT TOKEN :", token);
        const secret = process.env?.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ success: false, error: 'Server misconfigured' });
        }
        const docode = jwt.verify(token, secret, (err, decoded) => {
            console.log(decoded);
            if (decoded?.role == 'user') {
                res.json({ token, success: true, role: 'user' });
            }
            else if (decoded?.role == 'admin') {
                return res.json({ token, success: true, role: 'admin' });
            }
            else {
                return res.status(403).json({ message: "Access denied", success: false });
            }
        });
    }
    catch (error) {
        console.log("Is Authentication failed ", error);
    }
};
