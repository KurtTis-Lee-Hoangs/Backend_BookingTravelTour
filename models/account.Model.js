import mongoose from "../config/mongoose.js";

const accountSchema = new mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        default: "user",
    },
    Email: {
        type: String,
        required: true,
    },
    Active: {
        type: Boolean,
        default: false,
    }
} ,{timestamps: true})

const Account = mongoose.model("Account", accountSchema)
export default Account;