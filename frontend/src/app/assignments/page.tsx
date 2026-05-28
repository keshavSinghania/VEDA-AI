"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
} from "lucide-react";

import Header from "../../components/assignments/Header";
import { Noassignments } from "../../components/assignments/Noassignments";
import api from "@/lib/axios";

type Assignment = {
  _id: string;
  title: string;
  dueDate: string;
  instructions: string;
  status: "processing" | "completed" | "failed";
  createdAt: string;
};

const STATUS_STYLES = {
  completed: {
    bg: "#EDFBF1",
    color: "#1A9E47",
    dot: "#1A9E47",
  },

  processing: {
    bg: "#FFF8EC",
    color: "#D48A00",
    dot: "#D48A00",
  },

  failed: {
    bg: "#FFF2F2",
    color: "#E03434",
    dot: "#E03434",
  },
};

function AssignmentCard({
  assignment,
  onDelete,
}: {
  assignment: Assignment;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const style =
    STATUS_STYLES[
      assignment.status as keyof typeof STATUS_STYLES
    ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      className="bg-white rounded-2xl border border-[#EFEFEF]"
      style={{
        padding: 16,
        position: "relative",
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <p className="font-semibold text-[15px] flex-1 pr-2">
          {assignment.title}
        </p>

        <div className="flex items-center gap-2">
          <span
            className="flex items-center gap-1 rounded-full"
            style={{
              background: style.bg,
              color: style.color,
              padding: "4px 10px",
              fontSize: 12,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: style.dot,
              }}
            />

            {assignment.status}
          </span>

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 bg-white border rounded-xl z-50 overflow-hidden"
                style={{
                  minWidth: 170,
                  top: 25,
                }}
              >
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
                  onClick={() =>
                    router.push(
                      `/assignments/view/${assignment._id}`
                    )
                  }
                >
                  <Eye size={15} />
                  View Assignment
                </button>

                <button
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Delete this assignment?"
                      );

                    if (confirmed) {
                      onDelete(assignment._id);
                    }
                  }}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-3" />

      <div className="flex justify-between text-xs text-gray-500">
        <span>
          Assigned :
          {" "}
          {new Date(
            assignment.createdAt
          ).toLocaleDateString()}
        </span>

        <span>
          Due :
          {" "}
          {new Date(
            assignment.dueDate
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  const [assignments, setAssignments] = useState<
    Assignment[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await api.get(
        "/api/assignment"
      );

      setAssignments(
        res.data.assignments || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (
    id: string
  ) => {
    try {
      await api.delete(
        `/api/assignment/${id}`
      );

      setAssignments((prev) =>
        prev.filter((a) => a._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    }
  };

  const filteredAssignments =
    assignments.filter((assignment) =>
      assignment.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div
      className="bg-[#e7e7e7]"
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />

      <div
        className="bg-[#F4F4F4] rounded-2xl"
        style={{
          margin: 10,
          minHeight:
            "calc(100vh - 86px)",
        }}
      >
        {loading ? (
          <div className="p-10 text-center">
            Loading assignments...
          </div>
        ) : assignments.length === 0 ? (
          <Noassignments />
        ) : (
          <>
            <div className="bg-white border-b p-5">
              <h2 className="font-semibold">
                Assignments
              </h2>

              <p className="text-sm text-gray-500">
                Manage and create
                assignments
              </p>
            </div>

            <div className="bg-white border-b p-4">
              <div
                className="flex items-center border rounded-xl px-3"
                style={{
                  maxWidth: 350,
                }}
              >
                <Search
                  size={15}
                  color="#999"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search assignment"
                  className="w-full p-2 outline-none bg-transparent"
                />
              </div>
            </div>

            <div
              className="grid gap-4"
              style={{
                padding: 16,
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(300px,1fr))",
              }}
            >
              {filteredAssignments.map(
                (assignment) => (
                  <AssignmentCard
                    key={assignment._id}
                    assignment={
                      assignment
                    }
                    onDelete={
                      deleteAssignment
                    }
                  />
                )
              )}
            </div>

            <div
              className="fixed"
              style={{
                bottom: 30,
                left: "50%",
                transform:
                  "translateX(-50%)",
              }}
            >
              <Link
                href="/assignments/new"
              >
                <button
                  className="flex items-center gap-2 bg-black text-white rounded-full"
                  style={{
                    padding:
                      "14px 24px",
                  }}
                >
                  <Plus size={15} />
                  Create Assignment
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}