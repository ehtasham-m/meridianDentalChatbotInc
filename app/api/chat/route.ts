import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/ai/gemini";
import { aiFunctionDeclarations, executeAiTool } from "@/lib/ai/tools";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { SITE } from "@/lib/constants/site";
import type { Content } from "@google/genai";

interface IncomingMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMessages: IncomingMessage[] = body.messages || [];

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // Input sanitization & length limits
    const sanitizedMessages = rawMessages
      .slice(-15) // Keep last 15 messages to prevent context explosion
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        content: String(m.content || "").slice(0, 2000), // Cap each message at 2000 chars
      }))
      .filter((m) => m.content.trim().length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (keyErr) {
      console.error("Gemini API key error:", keyErr);
      return NextResponse.json({
        text: `I'm having trouble connecting to the receptionist service right now. Please call ${SITE.shortName} directly at ${SITE.phoneDisplay} or WhatsApp us at ${SITE.whatsappDisplay}.`,
        clientActions: [
          { type: "contact_fallback", phone: SITE.phoneDisplay, whatsapp: SITE.whatsappDisplay },
        ],
      });
    }

    // Build Gemini contents history
    const contents: Content[] = sanitizedMessages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const clientActions: Record<string, unknown>[] = [];
    let finalText = "";

    // Multi-turn agent loop for tool calls (max 5 iterations)
    for (let turn = 0; turn < 5; turn++) {
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ functionDeclarations: aiFunctionDeclarations }],
        },
      });

      const candidate = response.candidates?.[0];
      const modelContent = candidate?.content;
      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        // Append model turn with function calls to history
        if (modelContent) {
          contents.push(modelContent);
        }

        const functionResponseParts = [];
        for (const call of functionCalls) {
          if (!call.name) continue;
          try {
            const toolOutput = await executeAiTool(
              call.name,
              (call.args as Record<string, unknown>) || {}
            );

            if (toolOutput.clientAction) {
              clientActions.push(toolOutput.clientAction);
            }

            functionResponseParts.push({
              functionResponse: {
                name: call.name,
                response: {
                  output: toolOutput.result,
                },
              },
            });
          } catch (toolExecErr) {
            console.error(`Error executing tool ${call.name}:`, toolExecErr);
            functionResponseParts.push({
              functionResponse: {
                name: call.name,
                response: {
                  error: "Failed to execute function.",
                },
              },
            });
          }
        }

        // Append function response parts back as user/tool turn
        contents.push({
          role: "user",
          parts: functionResponseParts,
        });
      } else {
        // Model provided final text
        finalText = response.text || "";
        break;
      }
    }

    if (!finalText.trim()) {
      finalText = `Thank you for reaching out to ${SITE.shortName}. How else may I assist you with your dental care today?`;
    }

    return NextResponse.json({
      text: finalText,
      clientActions,
    });
  } catch (error: unknown) {
    console.error("Chat API route error:", error);
    return NextResponse.json({
      text: `I'm having trouble connecting right now. Please call ${SITE.shortName} at ${SITE.phoneDisplay} or WhatsApp us at ${SITE.whatsappDisplay}.`,
      clientActions: [
        { type: "contact_fallback", phone: SITE.phoneDisplay, whatsapp: SITE.whatsappDisplay },
      ],
    });
  }
}
