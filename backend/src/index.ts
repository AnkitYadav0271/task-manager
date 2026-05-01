import "dotenv/config";

import express from "express";
import { dbConnect } from "../db/db.init.js";

const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.json());

app.listen(PORT, () => {
  dbConnect();
  console.log("server is running");
});
