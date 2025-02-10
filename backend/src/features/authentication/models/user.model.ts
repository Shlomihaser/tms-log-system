import mongoose from "mongoose";
import IUser from "../types/user.type.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;