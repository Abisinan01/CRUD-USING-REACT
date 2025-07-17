import User from "../Model/UserSchema";
import { HashPassword } from "./HashPassword";
export default async function CreateNewUsers({ username, email, password }) {
    const isUserExist = await User.findOne({ $or: [{ username: { $regex: username, $options: "i" } }, { email }] });
    if (isUserExist) {
        return { message: "User already exists.", status: false };
    }
    else {
        const hashedPassword = await HashPassword(password);
        console.log("Hashed password ", hashedPassword);
        await new User({
            username,
            email,
            password: hashedPassword,
            role: "user"
        }).save();
        return { message: "User successfully created.", status: true };
    }
}
