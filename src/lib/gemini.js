const SYSTEM_PROMPT_TEMPLATE = `You are Chirag's portfolio assistant. You help visitors learn about Chirag's professional experience by answering questions accurately and concisely.

You are currently assisting on the following project:
---
{projectContext}
---

You also have access to Chirag's broader career context for cross-referencing:
---
{cvContext}
---

Rules:
- Only answer based on the provided context. If asked something not covered, say so politely.
- Be concise, professional, and conversational.
- When referencing specific metrics or outcomes, cite them accurately.
- If the user asks about a different project, acknowledge it and share what you know from the career context, but note that they can navigate to that project's page for a dedicated chat.
- Do not make up information not present in the context.`;

function buildSystemPrompt(projectContext, cvContext) {
  return SYSTEM_PROMPT_TEMPLATE
    .replace('{projectContext}', projectContext)
    .replace('{cvContext}', cvContext);
}

/**
 * Send a chat message to Gemini via the serverless proxy.
 * Supports streaming responses.
 *
 * @param {Array<{role: string, content: string}>} messages - Conversation history
 * @param {string} projectContext - Project-specific context for grounding
 * @param {string} cvContext - Broad CV context for cross-referencing
 * @param {object} options
 * @param {AbortSignal} [options.signal] - AbortController signal for cancellation
 * @returns {AsyncGenerator<string>} Yields text chunks as they stream in
 */
export async function* chatWithGemini(messages, projectContext, cvContext, options = {}) {
  const systemPrompt = buildSystemPrompt(projectContext, cvContext);

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt }),
    signal: options.signal,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Chat request failed (${res.status}): ${errorText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) yield parsed.text;
            if (parsed.error) throw new Error(parsed.error);
          } catch (e) {
            if (e.message.startsWith('Chat request failed') || e.message !== 'Unexpected end of JSON input') {
              if (data.trim()) yield data;
            }
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
