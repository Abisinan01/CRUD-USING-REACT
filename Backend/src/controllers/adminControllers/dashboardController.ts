import { Request, Response } from "express";
import User from "../../Model/UserSchema";

export const FetchUserData = async (req: Request, res: Response) => {
    try {
        console.log("Req fetchuser")
        const allUsers = await User.find({ role: "user" });
        console.log("All Users ", allUsers)
        res.json({ users: allUsers, success: true })
    } catch (error) {
        console.log("User data fetching failed admin : ", error)
        res.json({ message: "Data fetching failed ", success: false })
    }
}

export const Delete = async (req: Request, res: Response) => {
    try {
        console.log("id ", req.params.id)
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted", success: true })
    } catch (error) {
        console.log("Deletion failed: ", error)
        res.json({ message: "User deletion failed", success: false })
    }
}