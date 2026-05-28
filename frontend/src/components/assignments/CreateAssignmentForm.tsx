"use client";

import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import QuestionTypeCard from "./QuestionTypeCard";
import { Plus } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { assignmentSchema } from "@/lib/validation";
import api from "@/lib/axios";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

type StatusType =
  | "idle"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export default function CreateAssignmentForm() {
  const router = useRouter();

  const {
    assignment,
    setTitle,
    setDueDate,
    setInstructions,
    addQuestionType,
    resetAssignment,
  } = useAssignmentStore();

  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [status, setStatus] = useState<StatusType>("idle");
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(true);

  // SOCKET
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      transports: ["websocket"],
    });

    socket.on("assignment:status", (data) => {
      if (jobId && data.jobId !== jobId) return;

      setStatus(data.status);

      if (data.progress !== undefined) {
        setProgress(data.progress);
      }

      if (data.status === "completed") {
        setToast("Assignment Generated Successfully!");

        resetAssignment();

        setTimeout(() => {
          router.push("/assignments");
        }, 800);
      }

      if (data.status === "failed") {
        setToast("Generation Failed");
        setShowForm(true);
        setLoading(false);
      }
    });

    return () => socket.disconnect();
  }, [jobId, router, resetAssignment]);

  const totalQuestions = assignment.questionTypes.reduce(
    (acc, item) => acc + item.numberOfQuestions,
    0
  );

  const totalMarks = assignment.questionTypes.reduce(
    (acc, item) =>
      acc + item.numberOfQuestions * item.marksPerQuestion,
    0
  );

  const handleGenerateAssignment = async () => {
    const result = assignmentSchema.safeParse(assignment);

    if (!result.success) {
      setErrors(result.error.flatten());
      setToast("Fix validation errors");
      return;
    }

    setErrors(null);
    setLoading(true);

    setStatus("queued");
    setProgress(0);

    setShowForm(false);

    try {
      setToast("Sending assignment...");

      const res = await api.post(
        "/api/assignment/generate",
        result.data
      );

      setJobId(res.data.jobId);

      setToast("Job queued! Waiting for AI...");
    } catch (error) {
      setToast("Server error");

      setStatus("failed");
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "28px",
        maxWidth: "760px",
        width: "100%",
        margin: "0 auto",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        border: "1px solid #eee",
      }}
    >
      {/* TOAST */}
      {toast && (
        <div
          style={{
            marginBottom: "12px",
            padding: "10px 12px",
            background: "#111",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "13px",
          }}
        >
          {toast}
        </div>
      )}

      {/* STATUS */}
      {status !== "idle" && (
        <div
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "12px",
            background: "#f6f6f6",
          }}
        >
          <p>
            <b>Status:</b> {status}
          </p>

          <p>
            <b>Progress:</b> {progress}%
          </p>

          <div
            style={{
              height: "6px",
              background: "#ddd",
              borderRadius: "10px",
              marginTop: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#111",
                transition: "0.3s",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(20px, 4vw, 30px)",
                fontWeight: 700,
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              Your assignment is being generated
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
                color: "#666",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Feel free to leave this page or continue working on other tasks.
              We'll notify you by email once your assignment is ready.
            </p>
          </div>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <>
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              Assignment Details
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "#777",
              }}
            >
              Create AI-powered question paper
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <FileUpload />

            {/* TITLE */}
            <div>
              <p>Assignment Title</p>

              <input
                type="text"
                value={assignment.title}
                maxLength={60}
                placeholder="e.g. Class 10 Trigonometry Test"
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                <span>
                  Give your assignment a meaningful title
                </span>

                <span>
                  {assignment.title.length}/60
                </span>
              </div>

              {errors?.fieldErrors?.title && (
                <p style={{ color: "red" }}>
                  {errors.fieldErrors.title[0]}
                </p>
              )}
            </div>

            {/* DUE DATE */}
            <div>
              <p>Due Date</p>

              <input
                type="date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

              {errors?.fieldErrors?.dueDate && (
                <p style={{ color: "red" }}>
                  {errors.fieldErrors.dueDate[0]}
                </p>
              )}
            </div>

            {/* QUESTION TYPES */}
            <div>
              <p>Question Types</p>

              {assignment.questionTypes.map((item) => (
                <QuestionTypeCard
                  key={item.id}
                  item={item}
                />
              ))}

              <button
                type="button"
                onClick={addQuestionType}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Plus size={14} />
                Add Question Type
              </button>

              {errors?.fieldErrors?.questionTypes && (
                <p style={{ color: "red" }}>
                  {errors.fieldErrors.questionTypes[0]}
                </p>
              )}
            </div>

            {/* TOTALS */}
            <div
              style={{
                background: "#f5f5f5",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <p>
                Total Questions:
                <b> {totalQuestions}</b>
              </p>

              <p>
                Total Marks:
                <b> {totalMarks}</b>
              </p>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <p>Instructions</p>

              <textarea
                value={assignment.instructions}
                onChange={(e) =>
                  setInstructions(e.target.value)
                }
                placeholder="Enter syllabus, chapters, topics, difficulty preferences, or any additional instructions..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />

              {errors?.fieldErrors?.instructions && (
                <p style={{ color: "red" }}>
                  {errors.fieldErrors.instructions[0]}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleGenerateAssignment}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: loading ? "#666" : "#111",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Generating..."
                : "Generate Assignment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}