import { Worker } from "bullmq";
import { redis } from "../config/redis";
import { getIO } from "../config/socket";
import { Assignment } from "../models/Assignment.model";
import { generateAIQuestionPaper } from "../services/gemini.service";

export const worker = new Worker(
  "assignment",
  async (job) => {
    const io = getIO();
    const { dbId } = job.data;

    console.log("JOB RECEIVED:", job.data);
    try {
      //processing started emites
      io.emit("assignment:status", {
        jobId: job.id,
        dbId,
        status: "processing",
        progress: 10,
      });

      await job.updateProgress(30);
      //processing reached 30% as ai work started
       io.emit("assignment:status", {
        jobId: job.id,
        dbId,
        status: "processing",
        progress: 30,
      });

      // AI generation
      const result = await generateAIQuestionPaper(job.data);

      await job.updateProgress(80);
      //again emiting at 80%
      io.emit("assignment:status", {
        jobId: job.id,
        dbId,
        status: "processing",
        progress: 80,
      });

      // save result
      await Assignment.findByIdAndUpdate(dbId, {
        result,
        status: "completed",
      });
    //   // temp failure checking
    //   io.emit("assignment:status", {
    //     jobId: job.id,
    //     dbId,
    //     status: "failed",
    //     error: error.message,
    //   });

      // emit completed
      io.emit("assignment:status", {
        jobId: job.id,
        dbId,
        status: "completed",
        progress: 100,
        result,
      });

      console.log("job completed", job.id, result);

      return result;
    } catch (error: any) {
      console.error("Worker error:", error);

      // update DB failure status
      await Assignment.findByIdAndUpdate(dbId, {
        status: "failed",
      });

      // emit failure
      io.emit("assignment:status", {
        jobId: job.id,
        dbId,
        status: "failed",
        error: error.message,
      });

      throw error;
    }
  },
  {
    connection: redis,
  }
);