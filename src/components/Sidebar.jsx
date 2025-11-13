import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Pencil, Trash2, Download } from "lucide-react"; // for icons
import { downloadJSON } from "../utils/downloadJSON";

export default function Sidebar({ onChatSelect ,onClose }) {
  const {
    sessions,
    activeSessionId,
    createNewSession,
    setActiveSession,
    deleteSession,
    renameSession,
  } = useContext(ChatContext);

  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const handleChatClick = (id) => {
    setActiveSession(id);

    if (window.innerWidth < 768 && onChatSelect) onChatSelect();
  };

  const handleRename = (id) => {
    renameSession(id, tempTitle.trim() || "Untitled Chat");
    setEditingId(null);
  };

  return (
    <div className="h-full flex flex-col text-white ">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="font-bold text-lg">All Chats</h2>
        <button
          onClick={createNewSession}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition"
        >
          + New Chat
        </button>

        <button
          onClick={onClose}
          className="md:hidden text-gray-300 hover:text-white p-2 rounded"
        >
          ✕
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 && (
          <div className="text-white p-4 text-sm">
            No chats yet. Click <b>+ New</b> to start!
          </div>
        )}

        {sessions.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center justify-between m-2 p-3 rounded-md cursor-pointer transition ${chat.id === activeSessionId
              ? "bg-zinc-50 text-black font-medium"
              : "hover:bg-zinc-700"
              }`}
          >
            {/* Chat Title */}
            <div className="flex-1 text-center">
              {editingId === chat.id ? (
                <input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={() => handleRename(chat.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleRename(chat.id) : null
                  }
                  autoFocus
                  className="w-full bg-zinc-800 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div
                  onClick={() => handleChatClick(chat.id)}
                  onDoubleClick={() => {
                    setEditingId(chat.id);
                    setTempTitle(chat.title);
                  }}
                  className="truncate "
                >
                  {chat.title}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(chat.id);
                  setTempTitle(chat.title);
                }}
                className="hover:text-blue-400"
                title="Rename"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this chat permanently?"))
                    deleteSession(chat.id);
                }}
                className="hover:text-red-500"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  const sessionData = {
                    id: chat.id,
                    title: chat.title,
                    createdAt: chat.createdAt,
                    messages: chat.messages,
                  };

                  downloadJSON(`${chat.title}.json`, sessionData);
                }}
                className="hover:text-green-400"
                title="Download Chat"
              >
                <Download size={16} />
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
