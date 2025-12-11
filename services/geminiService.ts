
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const analyzeMedicalImage = async (base64Image: string): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert radiologist AI assistant named "NeuroScan".
    
    Analyze the provided medical image (Chest X-Ray) with high precision.
    1. Identify if this is a Chest X-ray. If not, mark diagnosis as "Uncertain".
    2. Check for opacities, consolidations, infiltrates, pleural effusion, or masses.
    3. Assess the overall lung clarity and cardiac silhouette.
    4. Provide a confidence score (0-100) based on visual evidence.
    5. Determine severity of any pathological findings.
    
    Return the result strictly in JSON format matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: {
              type: Type.STRING,
              enum: ["Pneumonia", "Normal", "Uncertain", "Other Findings"],
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence percentage from 0 to 100",
            },
            severity: {
              type: Type.STRING,
              enum: ["Low", "Medium", "High", "N/A"],
            },
            findings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of specific visual findings (e.g., 'Right lower lobe consolidation')",
            },
            recommendation: {
              type: Type.STRING,
              description: "Clinical recommendation based on findings",
            },
          },
          required: ["diagnosis", "confidence", "findings", "severity", "recommendation"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};

export const chatWithRadiologist = async (history: {role: string, parts: {text: string}[]}[], message: string, context?: string) => {
  try {
    const systemInstruction = `You are Dr. Neuro, a helpful and empathetic AI medical assistant. 
    The user is asking about a specific X-ray analysis. 
    Context of the current analysis: ${context || "No specific image loaded yet."}
    
    Rules:
    1. Explain medical terms in simple language.
    2. Do NOT give definitive medical diagnoses or prescribe medication.
    3. Always advise consulting a real doctor for final decisions.
    4. Be concise and professional.`;

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history as any
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw new Error("Failed to send message.");
  }
};
