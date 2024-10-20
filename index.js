import app from "./app.js";
import mongodb from "./config/mongoose.js";
import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT || 8000

app.listen(port, () => {
  mongodb;
  console.log(`Server started at port ${port}`);
});