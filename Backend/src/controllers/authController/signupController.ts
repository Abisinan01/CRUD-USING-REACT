import { Request, Response } from "express";
import { UserDetails } from "../../interfaces/UserDatas";
import CreateNewUsers from "../../utils/createNewUsers";


const SignUpForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, confirmPassword } = req.body.formData as UserDetails;
        console.log("password ", password)

        const newUser = await CreateNewUsers({ username, email, password, role:'user'})
        console.log('new user', newUser)
        if (newUser.status === false) {
            res.json({ message: "User already exists", status: false })
            return
        }
        res.status(200).json(newUser)
        return
    } catch (error) {
        console.log(error)
        res.json({ message: "Signup  failed ", success: false })
    }
}

export default SignUpForm
