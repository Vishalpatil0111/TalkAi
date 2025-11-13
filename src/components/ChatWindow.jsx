// src/components/ChatWindow.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { getAIResponse } from "../services/geminiService";

export default function ChatWindow() {
  const {
    activeSession,
    addMessage,
    editMessage,
    deleteMessage,
    activeSessionId,
  } = useContext(ChatContext);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ SEND MESSAGE
  const handleSend = async (message) => {
    if (!message.trim() || !activeSessionId) return;

    addMessage(activeSessionId, "user", message);
    setIsTyping(true);

    try {
      const aiText = await getAIResponse(message);
      addMessage(activeSessionId, "ai", aiText);
    } catch (err) {
      addMessage(activeSessionId, "ai", "Network Error. Tap Retry.", true);
    }

    setIsTyping(false);
  };

  // ✅ RETRY FAILED MESSAGE
  const handleRetry = async (failedMessage) => {
    const userPrompt =
      activeSession.messages[
        activeSession.messages.indexOf(failedMessage) - 1
      ]?.text;

    if (!userPrompt) return;

    setIsTyping(true);

    try {
      const aiText = await getAIResponse(userPrompt);
      addMessage(activeSessionId, "ai", aiText);
    } catch (err) {
      addMessage(activeSessionId, "ai", "Retry failed again 😢", true);
    }

    setIsTyping(false);
  };

  const [pendingEdit, setPendingEdit] = useState(null);

  const handleEdit = async (index, newText) => {
    // update user message
    editMessage(activeSessionId, index, newText);

    // store what we need for regeneration
    setPendingEdit({ index, newText });
  };

  useEffect(() => {
    // Only run when we have an edit waiting
    if (!pendingEdit) return;

    const { index, newText } = pendingEdit;

    // we now use the UPDATED activeSession.messages (React has re-rendered!)
    const messages = activeSession.messages;

    const nextIndex = index + 1;

    // delete old AI response if exists
    if (messages[nextIndex] && messages[nextIndex].sender === "ai") {
      deleteMessage(activeSessionId, nextIndex);
    }

    // regenerate AI response
    const regenerate = async () => {
      setIsTyping(true);

      try {
        const aiText = await getAIResponse(newText);
        addMessage(activeSessionId, "ai", aiText);
      } catch (err) {
        addMessage(activeSessionId, "ai", "Error regenerating response.", true);
      }

      setIsTyping(false);
      setPendingEdit(null); // clear pending state
    };

    regenerate();
  }, [pendingEdit, activeSession]);


  // 🔽 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages?.length, isTyping]);

  if (!activeSession)
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select or create a chat to start messaging
      </div>
    );

  return (
    <div className="flex flex-col h-full text-white">
      {/* HEADER */}
      <div className="p-4 font-semibold text-white">
        {activeSession.title}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <MessageList
          messages={activeSession.messages}
          onRetry={handleRetry}
          onEdit={handleEdit}     // 👈 ADD THIS
        />

        {isTyping && (
          <div className="text-sm text-gray-50 italic mt-2">
            AI is typing...
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="p-3">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
