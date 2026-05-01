import { configDotenv } from "dotenv";
configDotenv();

import express from "express";

const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.json());


app.listen(PORT,()=>{
    console.log("server is running");
})

