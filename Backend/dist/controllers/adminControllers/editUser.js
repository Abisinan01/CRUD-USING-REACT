import User from "../../Model/UserSchema";
export const EditUser = async (req, res) => {
    try {
        const user = req.body.formData;
        const isExists = await User.findOne({
            username: { $regex: new RegExp(`^${user.username}$`, 'i') },
            // email: { $regex: new RegExp(`^${user.email}$`, 'i') }
        });
        console.log("Isexists", isExists);
        if (isExists) {
            res.json({ message: "User already exists", success: false });
            return;
        }
        const updateUser = await User.findByIdAndUpdate(user.id, {
            $set: {
                username: user.username,
                email: user.email
            }
        });
        if (!updateUser) {
            res.status(400).json({ message: "Updation failed", success: false });
        }
        res.status(200).json({ message: "Updation done", success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Edit user failed", success: false });
    }
};
