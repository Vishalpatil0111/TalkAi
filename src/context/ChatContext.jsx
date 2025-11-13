// src/context/ChatContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);


  useEffect(() => {
    const stored = localStorage.getItem("chatSessions");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSessions(parsed.sessions || []);
      setActiveSessionId(parsed.activeSessionId || null);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "chatSessions",
      JSON.stringify({ sessions, activeSessionId })
    );
  }, [sessions, activeSessionId]);

  const createNewSession = () => {
    const newSession = {
      id: uuidv4(),
      title: `New Chat ${sessions.length + 1}`,
      createdAt: new Date().toISOString(),
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

const addMessage = (sessionId, sender, text, error = false) => {
  setSessions((prev) =>
    prev.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            messages: [
              ...s.messages,
              {
                sender,
                text,
                error,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : s
    )
  );
};


  // 🧭 Switch active session
  const setActiveSession = (id) => {
    setActiveSessionId(id);
  };

    const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));

    // If deleted chat was active → deactivate
    if (id === activeSessionId) {
      const remaining = sessions.filter((s) => s.id !== id);
      setActiveSessionId(remaining[0]?.id || null);
    }
  };

  // ✏️ Rename chat
  const renameSession = (id, newTitle) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
    );
  };

const editMessage = (sessionId, index, newText) => {
  setSessions(prev =>
    prev.map(s =>
      s.id === sessionId
        ? {
            ...s,
            messages: s.messages.map((msg, i) =>
              i === index ? { ...msg, text: newText } : msg
            )
          }
        : s
    )
  );
};


const deleteMessage = (sessionId, index) => {
  setSessions((prev) =>
    prev.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            messages: s.messages.filter((_, i) => i !== index),
          }
        : s
    )
  );
};

  // 🎯 Get currently active session
  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSession,
        activeSessionId,
        createNewSession,
        addMessage,
        setActiveSession,
        deleteSession,
        renameSession,
        editMessage,
        deleteMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
