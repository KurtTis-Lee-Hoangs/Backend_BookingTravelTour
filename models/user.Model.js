import mongodb from "../config/mongoose.js";

const userSchema = new mongodb.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    Birthday: {
      type: Date,
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

const User = mongodb.model("User", userSchema);
export default User;
