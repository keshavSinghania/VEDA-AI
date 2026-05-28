import { Assignment } from "../models/Assignment.model";
import { assignmentQueue } from "../queues/assignment.queue";

// Create Assignment + Queue Job
export const generateAssignment = async (
  req: any,
  res: any
) => {
  try {
    const data = req.body;

    const record = await Assignment.create({
      title: data.title,
      dueDate: data.dueDate,
      instructions: data.instructions,
      inputData: data,
      status: "processing",
    });

    const job = await assignmentQueue.add("generate", {
      ...data,
      dbId: record._id,
    });

    res.status(201).json({
      success: true,
      message: "Assignment queued successfully",
      jobId: job.id,
      assignmentId: record._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create assignment",
    });
  }
};

// Get all assignments (dashboard/list page)
export const getAssignments = async (
  req: any,
  res: any
) => {
  try {
    const assignments = await Assignment.find(
      {},
      {
        result: 0,
        inputData: 0,
      }
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
};

// Get single assignment
export const getAssignmentById = async (
  req: any,
  res: any
) => {
  try {
    const assignment = await Assignment.findById(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignment",
    });
  }
};

// Delete assignment
export const deleteAssignment = async (
  req: any,
  res: any
) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
      deletedAssignmentId: assignment._id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete assignment",
    });
  }
};