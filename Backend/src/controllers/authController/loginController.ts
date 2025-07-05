import { Request, Response } from "express";
import { UserDetails } from "../../interfaces/UserDatas";
import { isAlreadyExists } from "../../utils/checkAlreadyExist";
import { SignWithJwt } from "../../utils/signWithJwt";
import jwt, { decode } from "jsonwebtoken";
import dotenv from 'dotenv'
import comparePasswords from "../../utils/comparePassword";
dotenv.config()

export const LoginForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body.formData as UserDetails;
        console.log("password ", password)//DEBUG

        const isExistsUser = await isAlreadyExists({ username, email });
        console.log("isExistsUser ", isExistsUser)

        const comparePassword = await comparePasswords(password, isExistsUser?.user?.password)

        if (!comparePassword) {
            res.json({ message: "Incorrect password", success: false })
            return
        }

        if ((await isExistsUser).status === false) {
            res.json({
                success: false,
                message: (await isExistsUser).message
            })
        }

        const token = await SignWithJwt(username, isExistsUser.user?.id, isExistsUser?.user?.role || "User")
        console.log("jwt :", token);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });

        console.log('Login')
        res.status(200)
            .json({
                message: (await isExistsUser).message,
                success: true,
                token,
                user: isExistsUser.user
            })
        
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

        const docode = jwt.verify(token, secret, (err: any, decoded: any) => {
            console.log(decoded)
        })
        res.json({ token, success: true })

    } catch (error) {
        console.log("Is Authentication failed ", error)
    }
}