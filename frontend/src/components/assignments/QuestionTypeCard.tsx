"use client";

import { Minus, Plus, X } from "lucide-react";
import { QuestionType } from "@/types/assignment";
import { useAssignmentStore } from "@/store/assignmentStore";

interface Props {
  item: QuestionType;
}

const options = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
];

export default function QuestionTypeCard({ item }: Props) {
  const { updateQuestionType, removeQuestionType } =
    useAssignmentStore();

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "18px",
        }}
      >

        {/* QUESTION TYPE SELECT */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              marginBottom: "6px",
            }}
          >
            Question Type
          </p>

          <select
            value={item.type}
            onChange={(e) =>
              updateQuestionType(item.id, "type", e.target.value)
            }
            style={{
              width: "100%",
              background: "#f7f7f7",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "10px 12px",
              fontSize: "14px",
              outline: "none",
            }}
          >
            <option value="" disabled>
              Select question type
            </option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* DELETE BUTTON */}
        <button
          onClick={() => removeQuestionType(item.id)}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "18px",
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >

        {/* NUMBER OF QUESTIONS */}
        <div
          style={{
            background: "#f7f7f7",
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              marginBottom: "10px",
            }}
          >
            No. of Questions
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() =>
                updateQuestionType(
                  item.id,
                  "numberOfQuestions",
                  Math.max(item.numberOfQuestions - 1, 1)
                )
              }
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <Minus size={14} />
            </button>

            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              {item.numberOfQuestions}
            </span>

            <button
              onClick={() =>
                updateQuestionType(
                  item.id,
                  "numberOfQuestions",
                  item.numberOfQuestions + 1
                )
              }
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* MARKS */}
        <div
          style={{
            background: "#f7f7f7",
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            padding: "14px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              marginBottom: "10px",
            }}
          >
            Marks / Question
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() =>
                updateQuestionType(
                  item.id,
                  "marksPerQuestion",
                  Math.max(item.marksPerQuestion - 1, 1)
                )
              }
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <Minus size={14} />
            </button>

            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              {item.marksPerQuestion}
            </span>

            <button
              onClick={() =>
                updateQuestionType(
                  item.id,
                  "marksPerQuestion",
                  item.marksPerQuestion + 1
                )
              }
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}