
import { GoogleGenAI } from "@google/genai";
import { ProgramData } from '../types.ts';

export async function generateExecutiveSummary(program: ProgramData): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Based on the following corporate visit program, write a professional and persuasive 2-paragraph executive summary for my Director. 
    Highlight the balance between strategic work sessions and team cohesion activities in Casablanca.
    
    Program Details:
    - Agency: ${program.agency}
    - Location: ${program.location}
    - Date: ${program.date}
    - Main Activities: ${program.items.map(i => i.title).join(', ')}
    
    Language: French (as requested by the user context).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Erreur lors de la génération du résumé.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, je ne peux pas générer le résumé pour le moment.";
  }
}
