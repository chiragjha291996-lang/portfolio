import { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithGemini } from '../lib/gemini';
import { cvContext } from '../data/cvContext';

const SYSTEM_CONTEXT = `This is a general question about Chirag's overall work experience, education, skills, and career. There is no specific project in focus. Answer based on the full CV context provided.`;

const SUGGESTION_CHIPS = [
  { label: 'Summarize your work experience', icon: 'work' },
  { label: 'Tell me about your education', icon: 'school' },
  { label: 'What are your key skills?', icon: 'psychology' },
];

function HomeChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  const hasMessages = messages.length > 0;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      abortRef.current = new AbortController();
      const stream = chatWithGemini(
        updatedMessages,
        SYSTEM_CONTEXT,
        cvContext,
        { signal: abortRef.current.signal }
      );

      for await (const chunk of stream) {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, content: last.content + chunk };
          return updated;
        });
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [messages, isStreaming]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative z-20 mt-10 group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-ai-accent to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-slow"></div>
      <div className="relative glass-panel rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        {!hasMessages && (
          <div className="flex flex-col items-center gap-5 text-center px-6 py-8">
            <p className="text-base font-medium text-white font-display">
              5 years across <span className="text-ai-accent">Deloitte</span>, <span className="text-ai-accent">InfoEdge</span>, and <span className="text-ai-accent">PwC</span> &mdash; ask me anything.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-ai-accent/50 hover:bg-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[14px] text-ai-accent">{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasMessages && (
          <div className="overflow-y-auto px-4 py-3 space-y-3 max-h-80 md:max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-ai-accent text-white rounded-br-sm'
                      : 'bg-white/5 border border-white/10 text-text-secondary rounded-bl-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-accent animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-accent animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-accent animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <form onSubmit={handleSubmit} className={`px-3 py-3 bg-surface-darker/90 ${hasMessages ? 'border-t border-white/10' : ''}`}>
          <div className={`flex items-center gap-2 bg-surface-dark/80 rounded-lg border border-white/5 focus-within:border-ai-accent/30 transition-colors px-3 ${!hasMessages ? 'shadow-lg shadow-ai-accent/10' : ''}`}>
            <span className="material-symbols-outlined text-text-secondary text-lg">chat</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about my experience..."
              disabled={isStreaming}
              className={`flex-1 bg-transparent border-none text-sm text-white placeholder-text-secondary/50 focus:ring-0 focus:outline-none font-body disabled:opacity-50 ${!hasMessages ? 'py-4' : 'py-2.5'}`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="p-1.5 rounded-lg bg-gradient-to-r from-primary to-ai-accent hover:opacity-90 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-base">arrow_upward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeChatBox;
