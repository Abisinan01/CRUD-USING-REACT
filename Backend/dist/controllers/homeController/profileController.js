import User from "../../Model/UserSchema";
export const ProfileUpdate = async (req, res) => {
    try {
        console.log("Token data:", req?.user);
        const id = req?.user?.id;
        console.log('reqbody', req.body);
        const updateData = await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.name,
                email: req.body.email,
                profile: req.body.profile,
            }
        }, { new: true });
        if (!updateData) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.status(200).json({ message: "Profile updated", success: true, user: updateData });
    }
    catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Profile updation failed", success: false });
    }
};
