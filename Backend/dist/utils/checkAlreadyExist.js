import User from "../Model/UserSchema";
export const isAlreadyExists = async ({ username, email }) => {
    console.log("Checking for:", { username, email });
    const isExists = await User.findOne({
        $or: [
            { username: { $regex: `^${username}$`, $options: 'i' } },
            { email: { $regex: `^${email}$`, $options: 'i' } }
        ]
    });
    console.log("Debug isExists");
    if (!isExists || isExists.role === 'Admin') {
        return { message: "User not found", status: false };
    }
    return { message: "Done", status: true, user: isExists };
};
