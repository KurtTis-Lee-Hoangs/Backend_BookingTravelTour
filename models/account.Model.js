import mongodb from "../config/mongoose.js";

const accountSchema = new mongodb.Schema({
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

const Account = mongodb.model("Account", accountSchema)
export default Account