import { SignWithJwt } from "../../utils/signWithJwt";
import jwt from "jsonwebtoken";
import User from "../../Model/UserSchema";
export const LoginForm = async (req, res) => {
    try {
        const { username, email, password } = req.body.formData;
        console.log("password ", password); //DEBUG
        const isExistsUser = await User.findOne({ username });
        console.log("isExistsUser ", isExistsUser);
        if (!isExistsUser || isExistsUser.role !== 'Admin') {
            res.json({
                success: false,
                message: "Admin not found"
            });
        }
        const token = await SignWithJwt(username, isExistsUser?.id, isExistsUser?.role || "User");
        console.log("jwt :", token);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });
        res.status(200)
            .json({
            message: "Admin Logged In",
            success: true,
            token
        });
        return;
    }
    catch (error) {
        console.log(error);
    }
};
export const isAuthenticated = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        console.log("JWT TOKEN :", token);
        const secret = process.env?.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ success: false, error: 'Server misconfigured' });
        }
        const decode = jwt.verify(token, secret, (err, decoded) => {
            console.log("decoded ", decoded);
            if (decoded?.role !== 'Admin') {
                return res.status(403).json({ message: "Access denied", success: false });
            }
            return res.json({ token, success: true });
        });
    }
    catch (error) {
        console.log("Is Authentication failed ", error);
    }
};
