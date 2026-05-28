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
You are a senior AI system that generates structured academic assignment question papers for a production-grade educational platform.

You MUST act as a deterministic exam generator, not a conversational AI.

---

INPUT DATA

Instructions:
${data.instructions}

Due Date:
${data.dueDate}

Question Types Configuration:
${JSON.stringify(data.questionTypes)}

Additional Notes:
${data.additionalInstructions || "None"}

---

CRITICAL RULES

- Output ONLY valid JSON
- No markdown
- No explanations
- No extra text
- Must be JSON.parse() safe

---

OUTPUT FORMAT

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
          "difficulty": "easy" | "medium" | "hard"
        }
      ]
    }
  ]
}

---

RULES

1. Each questionTypes item = one section
2. section.title = type
3. section.questionType = type
4. EXACT numberOfQuestions per section
5. EXACT marksPerQuestion per question
6. No extra questions or sections
7. No external knowledge beyond instructions

---

DIFFICULTY
- 40% easy
- 40% medium
- 20% hard

If only 1 question → medium

---

FINAL RULE
Return ONLY JSON.
`;

const cleanJSON = (text: string) => {
  return text.replace(/```json|```/g, "").trim();
};

const safeParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (err) {
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
    model: "gemini-3.5-flash",
  });

  const prompt = buildPrompt(data);

  //TRYING 2 TIMES
  let output = await generateOnce(model, prompt);

  if (!output) {
    console.warn("Retrying AI generation...");

    output = await generateOnce(model, prompt);
  }

  //FINAL FALLBACK (NEVER FAIL API)
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
          questionType: "Fallback",
          questions: [
            {
              text: "AI generation failed. Please try again.",
              marks: 1,
              difficulty: "easy",
            },
          ],
        },
      ],
    };
  }

  //AUTO META FIX (SAFEGUARD)
  output.assignmentMeta = {
    dueDate: data.dueDate,
    totalSections: output.sections?.length || 0,
    totalQuestions:
      output.sections?.reduce(
        (acc: number, sec: any) => acc + (sec.questions?.length || 0),
        0
      ) || 0,
  };

  return output;
};

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// async function listModels() {
//   const models = await genAI.listModels();
//   console.log(models);
// }

// listModels();