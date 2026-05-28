import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type QuestionType = {
  type: string;
  numberOfQuestions: number;
  marksPerQuestion: number;
};

type GenerateInput = {
  instructions: string;
  dueDate: string;
  questionTypes: QuestionType[];
  additionalInstructions?: string;
};

const buildPrompt = (data: GenerateInput) => `
You are a senior exam paper generator AI.

Return ONLY valid JSON. No markdown. No explanation.

---

INPUT:
Instructions: ${data.instructions}
Due Date: ${data.dueDate}
Question Types: ${JSON.stringify(data.questionTypes)}
Additional: ${data.additionalInstructions || "None"}

---

OUTPUT FORMAT (STRICT)

{
  "assignmentMeta": {
    "dueDate": string,
    "totalSections": number,
    "totalQuestions": number
  },
  "sections": [
    {
      "title": string,
      "questionType": string,
      "questions": [
        {
          "text": string,
          "marks": number,
          "difficulty": "easy" | "medium" | "hard",
          "type": "mcq" | "short" | "long",
          "options": string[], 
          "correctAnswer": string
        }
      ]
    }
  ]
}

---

CRITICAL RULES:

1. Each questionTypes item = one section
2. EXACT numberOfQuestions must be generated
3. EXACT marksPerQuestion must be used
4. No extra questions or sections
5. No hallucination outside instructions

---

MCQ RULES (VERY IMPORTANT):

- If type = "mcq":
  - MUST include "options" array with EXACT 4 options
  - MUST include "correctAnswer"
  - options must be realistic and unique
- If NOT MCQ:
  - options = []
  - correctAnswer = ""

---

DIFFICULTY DISTRIBUTION:
- 40% easy
- 40% medium
- 20% hard

If only 1 question → medium

---

FINAL RULE:
Return ONLY valid JSON.
`;

const cleanJSON = (text: string) => {
  return text.replace(/```json|```/g, "").trim();
};

const safeParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const generateOnce = async (model: any, prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const cleaned = cleanJSON(text);
  return safeParse(cleaned);
};

export const generateAIQuestionPaper = async (data: GenerateInput) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = buildPrompt(data);

  let output = await generateOnce(model, prompt);

  if (!output) {
    console.warn("Retrying AI generation...");
    output = await generateOnce(model, prompt);
  }

  if (!output) {
    return {
      assignmentMeta: {
        dueDate: data.dueDate,
        totalSections: 0,
        totalQuestions: 0,
      },
      sections: [
        {
          title: "Fallback Section",
          questionType: "fallback",
          questions: [
            {
              text: "AI generation failed. Please try again.",
              marks: 1,
              difficulty: "easy",
              type: "short",
              options: [],
              correctAnswer: "",
            },
          ],
        },
      ],
    };
  }

  output.assignmentMeta = {
    dueDate: data.dueDate,
    totalSections: output.sections?.length || 0,
    totalQuestions:
      output.sections?.reduce(
        (acc: number, sec: any) =>
          acc + (sec.questions?.length || 0),
        0
      ) || 0,
  };

  return output;
};




