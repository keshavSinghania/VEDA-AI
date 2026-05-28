import express from "express";
import {
  generateAssignment,
  getAssignments,
  getAssignmentById,
  deleteAssignment,
} from "../controllers/assignment.controller";

const router = express.Router();

router.post("/generate", generateAssignment);

router.get("/", getAssignments);

router.get("/:id", getAssignmentById);

router.delete("/:id", deleteAssignment);

export default router;