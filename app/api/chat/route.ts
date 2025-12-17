import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_KEY!,
});

export async function POST(req: Request) {
  const { messages: userMessages } = await req.json();
  const systemPrompt =
    "Be really friendly and lovely and add a bit of humor 😊";
  const messages = [{ role: "system", content: systemPrompt }, ...userMessages];
  const stream = await openrouter.chat.send({
    model: "mistralai/devstral-2512:free",
    messages,
    stream: true,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
