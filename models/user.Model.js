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
    },
    Phone: {
      type: Number,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Address: {
      type: String,
      required: true
    },
    Photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongodb.model("User", userSchema);
export default User;
