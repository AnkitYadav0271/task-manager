import { Schema } from "mongoose";
import mongoose from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [],
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;
