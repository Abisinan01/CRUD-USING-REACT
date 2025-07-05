import { Schema, model } from "mongoose";
const UserSchema = new Schema({
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
    password: String,
    role: { type: String, default: "User" },
    profile: { type: String }
});
const User = model('Users', UserSchema);
export default User;
