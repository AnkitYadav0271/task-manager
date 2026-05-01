import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
console.log("logging the port :", process.env.PORT);
console.log("logging mongo uri :", MONGO_URI);
export async function dbConnect() {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI);
      console.log("Database connected successfully");
    } else {
      console.log("MONGO_DB uri is not available");
    }
  } catch (err) {
    console.log(err);
  }
}
