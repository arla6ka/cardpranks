// app/api/generate-message/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY!);

const systemPrompt = `You are a creative writer helping people create funny and lighthearted prank Christmas postcards. 
These postcards are meant to playfully confuse the recipients by pretending to be from someone they might know but can't quite place.
The tone should be friendly and festive, but slightly mysterious.
Some guidelines:
- Keep the message more than 350 and    under 400 characters, including spaces and punctuation, NO MORE THAN 400
- Include some vague references to made-up shared experiences
- Add holiday wishes
- Be humorous but never mean-spirited
- Sign with a common first name only
- Don't include any personal or private information
- Keep it family-friendly
- No emojis and excessive punctuation
- Don't be too informal or too formal
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent([
      systemPrompt,
      `Generate a prank Christmas postcard message based on this prompt: ${prompt}. 
      Remember to keep it under 320 characters.`
    ]);

    const response = result.response;
    const text = response.text();

    // Ensure the text is within character limit
    const trimmedText = text.slice(0, 400);

    return NextResponse.json({ message: trimmedText });
  } catch (error) {
    console.error('AI Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate message' }, { status: 500 });
  }
}