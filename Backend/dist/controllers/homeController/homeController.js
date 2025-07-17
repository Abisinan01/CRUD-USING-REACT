import User from "../../Model/UserSchema";
export const Home = async (req, res) => {
    try {
        const userData = await User.findById(req.user.id);
        res.status(200).json({ message: "Fetcing done", success: true, user: userData });
    }
    catch (error) {
        res.json({ message: "Data fetching failed", success: false });
        console.log(error);
    }
};
