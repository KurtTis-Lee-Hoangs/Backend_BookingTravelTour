import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import UserRouter from "./routes/users.Route.js";
import TourRouter from "./routes/tours.Route.js";
import AccountRouter from "./routes/account.Route.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/tours", TourRouter);
app.use("/account", AccountRouter)

app.listen(port, () => {
  connectMongoDB();
  console.log(`Server started at port ${port}`);
});
