import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const aiRecommendBooks = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(`
Você é um bibliotecário especializado em literatura infantil. 
O usuário vai descrever uma criança (idade, gostos, características).  
Sugira 3 livros em PORTUGUÊS.
Retorne apenas um JSON puro.

Descrição: "${prompt}"
  `);

  return JSON.parse(result.response.text());
};
