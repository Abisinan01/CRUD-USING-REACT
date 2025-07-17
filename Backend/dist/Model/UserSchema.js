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
    PhoneNumber: { type: String },
    password: String,
    role: { type: String, default: "user" },
    profile: { type: String }
});
const User = model('Users', UserSchema);
export default User;
