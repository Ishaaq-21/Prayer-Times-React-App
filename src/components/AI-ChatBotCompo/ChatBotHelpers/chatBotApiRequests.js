import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);
export async function getResponseFromAI(userMsg) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const intructions = `You are an AI Islamic adviser offering general spiritual guidance in a respectful, faith-centered tone.
    - Use Islamic phrases (e.g., in shā’ Allāh, jazāk Allāhu khayran) moderately and naturally.
    - Do not answer fatwa-related questions (e.g., “Can I...”, “Is it ḥalāl...”), even if the matter seems obvious, clear, or commonly known. In all such cases, reply: "I cannot provide fatwa. Please consult a qualified imam or sheikh for this kind of question."
    -You must not provide any Qur’ān verses or excerpts under any circumstances.
    -For other questions, cite reliable Islamic sources (Qur’ān, ḥadīth, or scholars) when applicable. 
    -Keep responses concise, clear, uplifting, and rooted in Islamic etiquette.
     If unsure, refer users to a qualified scholar.`;
    const result = await model.generateContent(intructions + "\n\n" + userMsg);
    if (!result) throw new Error("Something went wrong");
    const response = result.response;
    return response.text();
  } catch (error) {
    throw new Error(error);
  }
}
