import { useState } from "react";
import {
  Bot,
  User,
  Send,
  Paperclip,
  Sparkles,
  FileText,
  ChevronDown,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    type: "user",
    message:
      "What are the major environmental findings in the recent assessment reports?",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Based on the recent environmental assessment documents, the major findings relate to groundwater conditions, surface water quality, air quality, land utilization and vegetation. The reports also recommend continued environmental monitoring and mitigation measures for identified risk areas.",
    confidence: "96.4%",
    sources: [
      "Environmental Impact Assessment Report",
      "Groundwater Assessment Report",
    ],
  },
];

const suggestedQuestions = [
  "Summarize the latest geological reports",
  "Which documents have validation issues?",
  "What are the groundwater findings?",
  "Show low-confidence OCR documents",
];

const AssistantChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      message: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        message:
          "I have analyzed the available documents in the repository. The requested information can be identified from the indexed document content and validated against the available sources.",
        confidence: "94.8%",
        sources: [
          "Document Intelligence Repository",
          "Validation Records",
        ],
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <div className="neu-card p-5 lg:p-6">

      {/* Chat Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-200">

        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <Bot size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-600">
              Document Intelligence Chat
            </p>

            <p className="text-[10px] text-slate-400 mt-1">
              Ask questions about your documents
            </p>
          </div>

        </div>


        <button
          className="
            flex items-center gap-1.5
            px-3 py-2
            rounded-xl
            bg-[#eef1f4]
            text-[10px]
            font-medium
            text-slate-500
          "
        >
          All Documents
          <ChevronDown size={13} />
        </button>

      </div>


      {/* Messages */}
      <div className="mt-5 space-y-5 max-h-[500px] overflow-y-auto pr-1">

        {messages.map((message) => {

          const isUser = message.type === "user";

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >

              {/* AI Icon */}
              {!isUser && (
                <div
                  className="
                    w-9 h-9
                    shrink-0
                    rounded-xl
                    bg-[#eef1f4]
                    flex items-center justify-center
                    text-slate-500
                    shadow-[3px_3px_6px_rgba(163,177,198,0.18),-3px_-3px_6px_rgba(255,255,255,0.8)]
                  "
                >
                  <Bot size={17} />
                </div>
              )}


              <div
                className={`
                  max-w-[85%]
                  sm:max-w-[75%]
                  rounded-2xl
                  p-4
                  ${
                    isUser
                      ? "bg-[#e6eaee] text-slate-600 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.12),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]"
                      : "bg-[#eef1f4] text-slate-600 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.12),inset_-3px_-3px_6px_rgba(255,255,255,0.75)]"
                  }
                `}
              >

                <p className="text-sm leading-6">
                  {message.message}
                </p>


                {/* AI Source Information */}
                {!isUser && (
                  <div className="mt-4 pt-3 border-t border-slate-200">

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-1.5">
                        <Sparkles size={13} className="text-slate-400" />

                        <span className="text-[10px] text-slate-400">
                          AI Confidence
                        </span>

                        <span className="text-[10px] font-semibold text-slate-500">
                          {message.confidence}
                        </span>
                      </div>

                    </div>


                    <div className="mt-3">

                      <p className="text-[10px] font-semibold text-slate-400 mb-2">
                        Sources
                      </p>

                      <div className="space-y-2">

                        {message.sources.map((source) => (
                          <div
                            key={source}
                            className="
                              flex items-center gap-2
                              px-3 py-2
                              rounded-xl
                              bg-[#f4f6f8]
                              text-[10px]
                              text-slate-500
                            "
                          >
                            <FileText size={13} />
                            <span className="truncate">
                              {source}
                            </span>
                          </div>
                        ))}

                      </div>

                    </div>

                  </div>
                )}

              </div>


              {/* User Icon */}
              {isUser && (
                <div
                  className="
                    w-9 h-9
                    shrink-0
                    rounded-xl
                    bg-[#eef1f4]
                    flex items-center justify-center
                    text-slate-500
                    shadow-[3px_3px_6px_rgba(163,177,198,0.18),-3px_-3px_6px_rgba(255,255,255,0.8)]
                  "
                >
                  <User size={17} />
                </div>
              )}

            </div>
          );
        })}

      </div>


      {/* Suggestions */}
      <div className="mt-5">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Suggested Questions
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1">

          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleSuggestion(question)}
              className="
                shrink-0
                px-3 py-2
                rounded-xl
                bg-[#eef1f4]
                text-[10px]
                text-slate-500
                shadow-[2px_2px_5px_rgba(163,177,198,0.18),-2px_-2px_5px_rgba(255,255,255,0.8)]
                hover:text-slate-700
                transition
              "
            >
              {question}
            </button>
          ))}

        </div>

      </div>


      {/* Input */}
      <div className="mt-5">

        <div
          className="
            flex items-end gap-2
            p-2
            rounded-2xl
            bg-[#eef1f4]
            shadow-[inset_4px_4px_8px_rgba(163,177,198,0.18),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]
          "
        >

          <button
            className="
              w-10 h-10
              shrink-0
              rounded-xl
              flex items-center justify-center
              text-slate-400
              hover:text-slate-600
              transition
            "
            title="Attach document"
          >
            <Paperclip size={18} />
          </button>


          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask something about your documents..."
            className="
              flex-1
              resize-none
              bg-transparent
              outline-none
              border-none
              text-sm
              text-slate-700
              placeholder:text-slate-400
              py-2.5
            "
          />


          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="
              w-10 h-10
              shrink-0
              rounded-xl
              flex items-center justify-center
              bg-[#e1e6eb]
              text-slate-500
              shadow-[3px_3px_6px_rgba(163,177,198,0.2),-3px_-3px_6px_rgba(255,255,255,0.8)]
              hover:text-slate-700
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            <Send size={17} />
          </button>

        </div>

        <p className="text-[10px] text-slate-400 text-center mt-3">
          AI responses are generated from indexed document content and may require verification.
        </p>

      </div>

    </div>
  );
};

export default AssistantChat;