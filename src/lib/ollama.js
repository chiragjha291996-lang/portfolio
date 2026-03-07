/**
 * Connect to Ollama and use the Gemma model.
 * Requires Ollama running locally (e.g. `ollama run gemma3:270m`) and Vite proxy in dev.
 */

const OLLAMA_BASE = import.meta.env.DEV ? '/api/ollama' : 'http://localhost:11434';
const GEMMA_MODEL = 'gemma3:270m';

/**
 * Sends a prompt to the Gemma model via Ollama and returns the generated text.
 * @param {string} prompt - The prompt to send to the model
 * @param {Object} options - Optional settings
 * @param {boolean} options.stream - If true, returns a ReadableStream of chunks (default: false)
 * @param {string} options.model - Override model name (default: 'gemma3:270m')
 * @returns {Promise<{ response: string }>} When stream is false, the full response text
 * @returns {Promise<ReadableStream>} When stream is true, a stream of JSON chunks
 */
export async function connectGemma(prompt, options = {}) {
  const { stream = false, model = GEMMA_MODEL } = options;
  const url = `${OLLAMA_BASE}/api/generate`;

  const body = {
    model,
    prompt,
    stream,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ollama request failed (${res.status}): ${err}`);
  }

  if (stream) {
    return res.body;
  }

  const data = await res.json();
  return { response: data.response ?? '' };
}
