// lib/gemini.js
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// Function to generate content using the model and prompt
export const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt, { safetySettings });
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error; // Re-throw error to be caught by ChatPage
  }
};

export default generateContent;
