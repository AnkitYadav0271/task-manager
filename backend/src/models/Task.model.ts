import { Schema } from "mongoose";
import mongoose from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  assignedTo: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  dueDate: { type: Date, required: true },
});

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
