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
        const { username, email, password, role } = req.body.formData as UserDetails;
        console.log("password ", password, "role :", role)//DEBUG

        if (role === 'admin') {

        }
        const isExists = await isAlreadyExists({ username, email, role });
        if (!isExists.user) {
            res.json({ message: "Invalid credentials", success: false })
            return
        }
        console.log("isExists ", isExists)

        const comparePassword = await comparePasswords(password, isExists?.user?.password as string)
        console.log('Comparepasswered', comparePassword)

        if (!comparePassword) {
            res.json({ message: "Incorrect password", success: false })
            return
        }

        if ((await isExists).status === false) {
            res.json({
                success: false,
                message: (await isExists).message
            })
        }

        const token = await SignWithJwt(username, isExists.user?.id, isExists?.user?.role || "User")
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
                message: (await isExists).message,
                success: true,
                token,
                user: isExists.user
            })

    } catch (error) {
        console.log(error)
    }
}
