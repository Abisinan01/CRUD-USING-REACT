
import { Request, Response } from "express"

export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('jwt')
        return res.json({ message: 'User logged out', success: true })
    } catch (error) {
        res.json({ message: "Logout failed", success: false })
        console.log("logout error :",error)
    }
}


