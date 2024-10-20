import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { queryParser } from "express-query-parser"
import UserRouter from "./routes/users.Route.js";
import TourRouter from "./routes/tours.Route.js";
import AccountRouter from "./routes/account.Route.js"
import PostRouter from "./routes/post.Route.js"
import AuthRouter from "./routes/auth.Route.js"

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Hoặc dùng '*' nếu muốn cho phép mọi nguồn
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Các phương thức được phép
  credentials: true, // Nếu bạn cần gửi cookie hoặc authentication headers
}));

app.use(
    queryParser({
      parseNull: true,
      parseUndefined: true,
      parseBoolean: true,
      parseNumber: true
    })
  )

app.use("/user", UserRouter);
app.use("/tours", TourRouter);
app.use("/account", AccountRouter)
app.use("/post", PostRouter)
app.use("/auth", AuthRouter)

export default app;