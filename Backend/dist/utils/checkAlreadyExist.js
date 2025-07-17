import User from "../Model/UserSchema";
export const isAlreadyExists = async ({ username, email, role }) => {
    console.log("Checking for:", { username, email });
    const isExists = await User.findOne({
        $or: [
            { role, username: { $regex: `^${username}$`, $options: 'i' } },
            { email }
        ]
    });
    // if (role === 'user') {
    //     console.log("Debug isExists", isExists);
    //     if (!isExists || isExists.role === 'Admin') {
    //         return { message: "User not found", status: false, user: null };
    //     }
    // } else if (role === 'admin') {
    //     console.log("Debug isExists", isExists);
    //     if (!isExists || isExists.role === 'User') {
    //         return { message: "User not found", status: false, user: null };
    //     }
    // }
    console.log("Debug isExists", isExists);
    if (!isExists) {
        return { message: "User not found", status: false, user: null };
    }
    return { message: "Done", status: true, user: isExists };
};
