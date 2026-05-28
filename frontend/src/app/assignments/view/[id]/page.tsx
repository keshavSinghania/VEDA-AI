"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

import Header from "@/components/assignments/Header";
import api from "@/lib/axios";

type Question = {
  text: string;
  marks: number;
  difficulty: string;
};

type Section = {
  title: string;
  questionType: string;
  questions: Question[];
};

type Assignment = {
  _id: string;
  title: string;
  dueDate: string;
  instructions: string;
  status: string;
  createdAt: string;

  result: {
    assignmentMeta: {
      dueDate: string;
      totalSections: number;
      totalQuestions: number;
    };

    sections: Section[];
  };
};

export default function ViewAssignmentPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const res = await api.get(`/api/assignment/${id}`);
      setAssignment(res.data.assignment);
    } catch (err) {
      console.error("Failed to fetch assignment", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!assignment) return;

    const pdf = new jsPDF();
    let y = 20;

    const addLine = (text: string, gap = 10) => {
      pdf.text(text, 20, y);
      y += gap;
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    };

    pdf.setFontSize(18);
    addLine(assignment.title, 14);

    pdf.setFontSize(12);

    addLine("Name: ________________________________");
    addLine("Roll Number: _________________________");
    addLine("Section: _____________________________");
    addLine("Total Time: __________________________");

    y += 5;

    assignment.result.sections.forEach((section, sectionIndex) => {
      pdf.setFontSize(14);
      addLine(`Section ${String.fromCharCode(65 + sectionIndex)}: ${section.title}`, 12);

      pdf.setFontSize(12);

      section.questions.forEach((q, index) => {
        const lines = pdf.splitTextToSize(
          `${index + 1}. ${q.text}`,
          165
        );

        pdf.text(lines, 20, y);
        y += lines.length * 6;

        pdf.text(`[${q.marks} Marks]`, 180, y - 5);

        y += 8;

        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
      });

      y += 10;
    });

    pdf.save(`${assignment.title.replace(/\s+/g, "-")}.pdf`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Loading assignment...
      </div>
    );
  }

  if (!assignment) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Assignment not found
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#e7e7e7", paddingTop: 10 }}>
      <Header />

      {/* TOP BAR */}
      <div style={{
        margin: 10,
        background: "#1A1A1A",
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <div>
          <h2 style={{ color: "#fff", margin: 0 }}>
            {assignment.title}
          </h2>
          <p style={{ color: "#bbb", marginTop: 6, fontSize: 13 }}>
            AI Generated Assignment
          </p>
        </div>

        <button
          onClick={downloadPDF}
          style={{
            background: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer"
          }}
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* PAPER */}
      <div style={{
        margin: 10,
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #eee"
      }}>

        {/* TITLE */}
        <div style={{
          padding: 30,
          textAlign: "center",
          borderBottom: "1px solid #eee"
        }}>
          <h1 style={{ margin: 0 }}>{assignment.title}</h1>
        </div>

        {/* STUDENT INFO */}
        <div style={{ padding: 30, borderBottom: "1px solid #eee" }}>
          <h3 style={{ marginBottom: 16 }}>Student Information</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>Name: ________________________________</div>
            <div>Roll Number: _________________________</div>
            <div>Section: _____________________________</div>
            <div>Total Time: __________________________</div>
          </div>

          <div style={{
            marginTop: 20,
            fontSize: 13,
            color: "#666",
            display: "flex",
            gap: 20,
            flexWrap: "wrap"
          }}>
            <div>
              Total Questions: <b>{assignment.result.assignmentMeta.totalQuestions}</b>
            </div>
            <div>
              Total Sections: <b>{assignment.result.assignmentMeta.totalSections}</b>
            </div>
            <div>
              Due Date: <b>{assignment.dueDate}</b>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div style={{ padding: 30 }}>
          {assignment.result.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <h2>Section {String.fromCharCode(65 + i)}</h2>
              <p style={{ color: "#666", fontWeight: 600 }}>{section.title}</p>

              {section.questions.map((q, j) => (
                <div key={j} style={{ marginTop: 12 }}>
                  <p style={{ margin: 0, lineHeight: 1.7 }}>
                    {j + 1}. {q.text}
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                    [{q.marks} Marks]
                  </p>
                </div>
              ))}
            </div>
          ))}

          <div style={{ textAlign: "center", borderTop: "1px solid #eee", paddingTop: 20 }}>
            — End of Assignment —
          </div>
        </div>
      </div>
    </div>
  );
}