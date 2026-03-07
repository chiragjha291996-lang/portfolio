import { useState, useRef, useEffect, useCallback } from 'react';
import { chatWithGemini } from '../lib/gemini';
import { cvContext } from '../data/cvContext';

const SUGGESTION_CHIPS = {
  'Program Management': [
    'What was the team structure?',
    'How did you manage stakeholders?',
    'What were the key milestones?',
  ],
  'Strategy': [
    'What was the strategic approach?',
    'What were the measurable outcomes?',
    'How did you validate the strategy?',
  ],
  'Personal Project': [
    'What motivated this project?',
    'What technologies did you use?',
    'What did you learn?',
  ],
};

const DEFAULT_CHIPS = [
  'What was your role?',
  'What challenges did you face?',
  'What were the outcomes?',
];

function FloatingChat({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const chips = SUGGESTION_CHIPS[project.category] || DEFAULT_CHIPS;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);

    const assistantMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      abortRef.current = new AbortController();
      const stream = chatWithGemini(
        updatedMessages,
        project.chatContext || '',
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
  }, [messages, isStreaming, project.chatContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChipClick = (chip) => {
    sendMessage(chip);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (project.isPlaceholder) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[360px] h-[520px] glass-panel rounded-2xl border border-white/10 shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface-darker/90 backdrop-blur-md">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-ai-accent text-lg">smart_toy</span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{project.title}</h4>
                <p className="text-[10px] font-mono text-text-secondary">Ask me anything about this project</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-text-secondary hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-2">
                <span className="material-symbols-outlined text-4xl text-ai-accent/40">forum</span>
                <p className="text-sm text-text-secondary">
                  Ask about Chirag&apos;s role, challenges, outcomes, or anything else related to this project.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleChipClick(chip)}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-ai-accent/50 hover:bg-white/10 text-[11px] font-mono text-text-secondary hover:text-white transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-white/10 bg-surface-darker/90 backdrop-blur-md">
            <div className="flex items-center gap-2 bg-surface-dark/80 rounded-lg border border-white/5 focus-within:border-ai-accent/30 transition-colors px-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                disabled={isStreaming}
                className="flex-1 bg-transparent border-none py-2.5 text-sm text-white placeholder-text-secondary/50 focus:ring-0 focus:outline-none font-body disabled:opacity-50"
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
      )}

      {/* Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-ai-accent/20 transition-all duration-300 ${
          isOpen
            ? 'bg-surface-darker border border-white/10 rotate-0'
            : 'bg-gradient-to-r from-primary to-ai-accent hover:shadow-xl hover:shadow-ai-accent/30 hover:scale-105'
        }`}
      >
        <span className="material-symbols-outlined text-white text-2xl">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  );
}

export default FloatingChat;
