import { Schema } from "mongoose";
import mongoose from "mongoose";

const memberSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",   
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MEMBER"], 
      default: "MEMBER",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [memberSchema], 
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;