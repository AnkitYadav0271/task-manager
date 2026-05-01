import { Schema } from "mongoose";
import mongoose from "mongoose";

//if we have time then will also add types in it

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  projects: [],
  updatedAt: new Date(),
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
