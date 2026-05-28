import { create } from "zustand";
import { AssignmentFormData, QuestionType } from "@/types/assignment";

interface AssignmentStore {
  assignment: AssignmentFormData;

  setTitle: (title: string) => void;
  setDueDate: (date: string) => void;
  setInstructions: (instructions: string) => void;
  setUploadedFile: (file: File | null) => void;

  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (
    id: string,
    field: keyof QuestionType,
    value: string | number
  ) => void;

  resetAssignment: () => void;
}

const defaultQuestionType = (): QuestionType => ({
  id: crypto.randomUUID(),
  type: "Multiple Choice Questions",
  numberOfQuestions: 1,
  marksPerQuestion: 1,
});

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignment: {
    title: "",
    dueDate: "",
    instructions: "",
    uploadedFile: null,
    questionTypes: [],
  },

  setTitle: (title) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        title,
      },
    })),

  setDueDate: (dueDate) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        dueDate,
      },
    })),

  setInstructions: (instructions) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        instructions,
      },
    })),

  setUploadedFile: (uploadedFile) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        uploadedFile,
      },
    })),

  addQuestionType: () =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        questionTypes: [
          ...state.assignment.questionTypes,
          defaultQuestionType(),
        ],
      },
    })),

  removeQuestionType: (id) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        questionTypes: state.assignment.questionTypes.filter(
          (item) => item.id !== id
        ),
      },
    })),

  updateQuestionType: (id, field, value) =>
    set((state) => ({
      assignment: {
        ...state.assignment,
        questionTypes: state.assignment.questionTypes.map((item) =>
          item.id === id
            ? {
                ...item,
                [field]: value,
              }
            : item
        ),
      },
    })),

  resetAssignment: () =>
    set({
      assignment: {
        title: "",
        dueDate: "",
        instructions: "",
        uploadedFile: null,
        questionTypes: [],
      },
    }),
}));