import http from "http";
import dotenv from "dotenv";

import { app } from "./app";
import { initSocket } from "./config/socket";
import { connectDB } from "./config/db";
import "./workers/assignment.worker";

dotenv.config();

const server = http.createServer(app);

// socket setup
initSocket(server);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();