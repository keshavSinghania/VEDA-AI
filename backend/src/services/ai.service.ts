export const generateAIQuestionPaper = async (data: any) => {
  console.log("AI INPUT:", data);

  // simulate AI processing delay (5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    sections: [
      {
        title: "Section A",
        questions: [
          {
            text: "Sample Question",
            difficulty: "easy",
            marks: 2,
          },
        ],
      },
    ],
  };
};