export type Difficulty = "easy" | "medium" | "hard";

export type QuestionTypeName =
  | "Multiple Choice Questions"
  | "Short Questions"
  | "Long Questions"
  | "Numerical Problems";

export interface QuestionType {
  id: string;
  type: QuestionTypeName;
  numberOfQuestions: number;
  marksPerQuestion: number;
}

export interface AssignmentFormData {
  title: string;
  dueDate: string;
  instructions: string;
  uploadedFile: File | null;
  questionTypes: QuestionType[];
}