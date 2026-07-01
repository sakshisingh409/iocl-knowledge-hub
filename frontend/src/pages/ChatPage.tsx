import { useRef, useState } from "react";
import { RefreshCw, Send, Sparkles } from "lucide-react";
import { CHAT_SUGGESTIONS, MOCK_CHAT_RESPONSES } from "../data/mockData";
import type { ChatMessage } from "../types";
import PageHeader from "../components/ui/PageHeader";

function getMockResponse(input: string): string {
  const key = input.toLowerCase().trim();
  return MOCK_CHAT_RESPONSES[key] ?? MOCK_CHAT_RESPONSES.default;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getMockResponse(trimmed),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      scrollToBottom();
    }, 900);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        eyebrow="AI ASSISTANT"
        title="Knowledge Hub Chat"
        subtitle="Ask anything about IOCL magazines, newspapers, and policies."
        action={
          <button
            type="button"
            onClick={handleNewChat}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
          >
            <RefreshCw className="h-4 w-4" />
            New chat
          </button>
        }
      />

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-iocl-navy">
                <Sparkles className="h-7 w-7 text-iocl-orange" />
              </div>
              <h3 className="text-xl font-bold text-iocl-navy">How can I help you today?</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                I can find magazines, summarize publications, and answer questions about IOCL
                knowledge.
              </p>
              <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-3">
                {CHAT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-600 transition hover:border-iocl-orange hover:bg-iocl-orange-light hover:text-iocl-navy"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-iocl-orange text-white"
                        : "bg-slate-100 text-iocl-navy"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-400">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about magazines, newspapers, topics..."
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex items-center gap-2 rounded-xl bg-iocl-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
