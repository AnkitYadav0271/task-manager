import "dotenv/config";

import express from "express";
import { dbConnect } from "../db/db.init.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 4040;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router middleware

app.use("/auth", authRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log("server is running");
});
