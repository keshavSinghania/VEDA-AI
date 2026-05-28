import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: String,
    },

    instructions: {
      type: String,
      required: false,
      default: undefined,
    },

    inputData: {
      type: mongoose.Schema.Types.Mixed,
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Assignment = mongoose.model(
  "Assignment",
  AssignmentSchema
);