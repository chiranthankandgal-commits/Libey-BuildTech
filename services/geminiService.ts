
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const getGeminiResponse = async (prompt: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an expert consultant for Libey BuildTech. You help business decision-makers (developers, architects) understand how BIM-led planning prevents cost overruns. You are professional, calm, and focus on business value (cost certainty, accuracy) rather than technical jargon like scripts or coding. If asked for a human expert, suggest scheduling a Discovery Call.",
    }
  });

  const response = await chat.sendMessage({ message: prompt });
  return response.text;
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image,
    },
  };
  const textPart = { text: prompt };
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [imagePart, textPart] },
  });
  
  return response.text;
};

export const generateVisionVideo = async (prompt: string, base64Image?: string) => {
  // Check for API key selection for Veo models
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const videoConfig: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  };

  if (base64Image) {
    videoConfig.image = {
      imageBytes: base64Image,
      mimeType: 'image/jpeg'
    };
  }

  let operation = await ai.models.generateVideos(videoConfig);
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${API_KEY}`;
};
