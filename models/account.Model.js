import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    active: {
        type: Boolean,
        default: false,
    }
} ,{timestamps: true})

const Account = mongoose.model("Account", accountSchema)
export default Account