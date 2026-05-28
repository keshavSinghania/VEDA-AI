import express from "express";
import cors from "cors";
import assignmentRoutes from "./routes/assignment.routes"

export const app = express();

app.use(cors());//handles cors errrrrror
app.use(express.json());//json convertor

app.use("/api/assignment", assignmentRoutes);



// POST  /api/assignment/generate   -> Create + Queue

// GET   /api/assignment            -> List all assignments

// GET   /api/assignment/:id        -> Full assignment details

// DELETE /api/assignment/:id        -> Delete assignment