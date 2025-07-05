import User from "../Model/UserSchema";

interface IUser {
    username: string;
    email: string;
}

export const isAlreadyExists = async ({ username, email }: IUser) => {
    console.log("Checking for:", { username, email });

    const isExists = await User.findOne({
        $or: [
            { username: { $regex: `^${username}$`, $options: 'i' } },
            { email: { $regex: `^${email}$`, $options: 'i' } }
        ]
    });

    console.log("Debug isExists", isExists);
    if (!isExists || isExists.role === 'Admin') {
        return { message: "User not found", status: false , user:null};
    }

    return { message: "Done", status: true, user: isExists };
};

