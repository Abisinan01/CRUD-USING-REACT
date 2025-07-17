import User from "../../Model/UserSchema";
export const CreateUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body.formData;
        console.log("password ", password);
        const newUser = new User({
            username,
            email,
            password,
            role: 'User'
        });
        await newUser.save();
        console.log('new user', newUser);
        res.status(200).json(newUser);
        return;
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Create user failed ", success: false });
    }
};
