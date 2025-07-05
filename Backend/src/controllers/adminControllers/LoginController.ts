
import { Request, Response } from "express"
import { isAlreadyExists } from "../../utils/checkAlreadyExist";
import { SignWithJwt } from "../../utils/signWithJwt";
import { UserDetails } from "../../interfaces/UserDatas";
import jwt from "jsonwebtoken";
import User from "../../Model/UserSchema";
import comparePasswords from "../../utils/comparePassword";
export const LoginForm = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body.formData as UserDetails;
        console.log("password ", password)//DEBUG

        const isExistsUser = await User.findOne({ username })
        console.log("isExistsUser ", isExistsUser)

        if (!isExistsUser || isExistsUser.role !== 'Admin') {
            res.json({
                success: false,
                message: "Admin not found"
            })
        }

        const checkPassword = await comparePasswords(password, isExistsUser?.password)
        if (!checkPassword) {
            res.json({
                success: false,
                message: "Incorrect password"
            })
        }
        const token = await SignWithJwt(username, isExistsUser?.id, isExistsUser?.role || "User")
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
                token,
                user:isExistsUser
            })
        return
    } catch (error) {
        console.log(error)
    }
}

export const isAuthenticated = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.jwt!
        console.log("JWT TOKEN :", token)
        const secret = process.env?.JWT_SECRET

        if (!secret) {
            return res.status(500).json({ success: false, error: 'Server misconfigured' });
        }

        const decode = jwt.verify(token, secret, (err: any, decoded: any) => {
            console.log("decoded ", decoded)
            if (decoded?.role !== 'Admin') {
                return res.status(403).json({ message: "Access denied", success: false });
            }
            return res.json({ token, success: true })
        })


    } catch (error) {
        console.log("Is Authentication failed ", error)
    }
}