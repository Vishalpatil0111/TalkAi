import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";


export default function MessageItem({ sender, text, timestamp, error, onRetry,onEdit }) {
  const isUser = sender === "user";

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);

  const containsMarkdown =
    text.includes("**") ||
    text.includes("*") ||
    text.includes("- ") ||
    text.includes("```") ||
    text.includes("#") ||
    text.includes(">");

  const timeString = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bubbleStyle = !containsMarkdown
    ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
    : isUser
      ? "bg-blue-600 text-white"
      : "bg-zinc-900/80 text-zinc-200 border border-zinc-700";

  const errorStyle = error ? "bg-red-400 text-red-900 border border-red-600" : "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg 
        ${bubbleStyle} ${errorStyle}
        ${isUser ? "rounded-br-none" : "rounded-bl-none"}
        `}
      >

        {/* TEXT */}
        {/* EDIT MODE */}
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full bg-black/50 text-white border border-zinc-700 p-2 rounded"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  onEdit(editValue);   
                  setIsEditing(false);
                }}
                className="px-3 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEditValue(text);
                  setIsEditing(false);
                }}
                className="px-3 py-1 text-xs bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* NORMAL VIEW */}
            {!containsMarkdown ? (
              <p>{text}</p>
            ) : (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: ({ children }) => (
                      <code className="bg-black/50 border border-zinc-700 px-1 py-1 rounded text-[13px]">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-black/60 border border-zinc-700 p-3 rounded-lg overflow-x-auto mb-2">
                        {children}
                      </pre>
                    ),
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-2">{children}</ol>
                    ),
                  }}
                >
                  {text}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}


        {/* TIMESTAMP */}
        <div className="mt-1 text-[10px] text-gray-300 text-right">
          {timeString}
        </div>

        {/* RETRY BUTTON */}
        {!isUser && error && (
          <button
            onClick={onRetry}
            className="mt-2 px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>


        )}

        {!isUser && !error && (


          <button
            onClick={() => navigator.clipboard.writeText(text)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition"
            title="Copy"
          >
            <Copy size={16} />
          </button>
        )}

        {isUser && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs"
          >
            Edit
          </button>
        )}


      </div>
    </div>
  );
}
