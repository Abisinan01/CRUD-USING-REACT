import mongoose, { Document, Schema, model } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role?: string;
    profile: string;
    PhoneNumber: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    PhoneNumber:{type:String},
    password: String,
    role: { type: String, default: "user" },
    profile:{type:String}
});

const User = model<IUser>('Users', UserSchema)
export default User