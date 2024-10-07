import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoose.set("strictQuery", false);
// const mongodb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {});
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

const mongodb = await mongoose.connect(process.env.MONGODB_URI, {});

export default mongodb; 