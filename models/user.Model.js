import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    UserID: {
      type: Number,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      min: 12,
    },
    Phone: {
      type: Number,
      required: true,
      unique: true,
    },
    Address: {
      type: String,
    },
    Photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
