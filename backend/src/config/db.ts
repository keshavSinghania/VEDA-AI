import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Mongo connected")
    } catch (error) {
        console.log("MongoDB error:", error);
        process.exit(1);
    }
}