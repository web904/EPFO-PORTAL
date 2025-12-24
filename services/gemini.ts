
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `You are a professional PF (Provident Fund) Assistant. 
Your goal is to help Indian employees understand their UAN, PF balance, withdrawal rules, 
pension (EPS), interest rates, and KYC requirements. 

CRITICAL: Use the googleSearch tool for any queries regarding current interest rates, new circulars, or recently changed EPFO policies for 2024-2025.
Provide clear, concise, and accurate information based on the search results and EPFO guidelines. 
Always extract and provide source URLs from the grounding metadata if you used search.
If you don't know something for certain, advise the user to check the official EPFO website (epfindia.gov.in).`;

export async function getAIAssistance(history: ChatMessage[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ googleSearch: {} }] as any,
      },
    });

    let text = response.text || "I'm sorry, I couldn't process that request.";
    
    const grounding = response.candidates?.[0]?.groundingMetadata;
    if (grounding?.groundingChunks) {
      const links = grounding.groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => `\n- [${chunk.web.title}](${chunk.web.uri})`);
      
      if (links.length > 0) {
        text += "\n\n**Sources:**" + Array.from(new Set(links)).join("");
      }
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to PF Assistant. Please try again later.";
  }
}

export async function getLatestEPFOUpdates() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "What are the 3 most recent and important news updates or circulars for EPFO members in May 2024? Format as a JSON array of objects with 'title', 'summary', and 'date'.",
      config: {
        tools: [{ googleSearch: {} }] as any,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              date: { type: Type.STRING }
            },
            required: ["title", "summary", "date"]
          }
        }
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
}
