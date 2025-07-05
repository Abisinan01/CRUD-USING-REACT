import { Request, Response } from "express";
import CreateNewUsers from "../../utils/createNewUsers";
import { UserDetails } from "../../interfaces/UserDatas";
import User from "../../Model/UserSchema";

export const CreateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, confirmPassword } = req.body.formData as UserDetails;
        console.log("password ", password)

        const newUser = new User({
            username,
            email,
            password,
            role:'User'
        })
        await newUser.save()
        console.log('new user', newUser)

        res.status(200).json(newUser)
        return
    } catch (error) {
        console.log(error)
        res.json({ message: "Create user failed ", success: false })
    }
}