import { z } from "zod";

export const assignmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title cannot exceed 60 characters"),

  dueDate: z
    .string()
    .min(1, "Due date is required"),

  instructions: z
    .string()
    .optional(),

  questionTypes: z
    .array(
      z.object({
        type: z
          .string()
          .min(1, "Select question type"),

        numberOfQuestions: z
          .number()
          .min(1, "At least 1 question required"),

        marksPerQuestion: z
          .number()
          .min(1, "Marks must be greater than 0"),
      })
    )
    .min(1, "At least one question type is required ❌"),
});