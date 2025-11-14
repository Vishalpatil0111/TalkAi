import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Pencil, Trash2, Download } from "lucide-react";
import { downloadJSON } from "../utils/downloadJSON";

export default function Sidebar({ onChatSelect, onClose }) {
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
    <div className="
      h-full flex flex-col text-white 
      bg-black/40 backdrop-blur-xl 
      border-r border-white/10
    ">

      <div className="flex items-center justify-between p-4 border-b border-white/10">

        <h2 className="font-bold text-lg">All Chats</h2>

        {/* Right side buttons */}
        <div className="flex gap-2 items-center">

          {/* New Chat (always visible) */}
          <button
            onClick={createNewSession}
            className="
        bg-blue-600 text-white px-3 py-1 rounded text-sm 
        hover:bg-blue-700 transition
      "
          >
            + New
          </button>

          {/* Close (mobile only) */}
          <button
            onClick={onClose}
            className="
        md:hidden 
        text-gray-300 hover:text-white p-2 rounded
      "
          >
            ✕
          </button>

        </div>
      </div>


      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 && (
          <div className="text-white p-4 text-sm">
            No chats yet. Click <b>+ New</b> to start!
          </div>
        )}

        {sessions.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center justify-between m-2 p-3 rounded-md cursor-pointer transition
            ${chat.id === activeSessionId
                ? "bg-white text-black font-semibold shadow-lg"
                : "hover:bg-white/10"
              }
          `}
          >
            {/* Chat title */}
            <div className="flex-1 text-left">
              {editingId === chat.id ? (
                <input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={() => handleRename(chat.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleRename(chat.id) : null
                  }
                  autoFocus
                  className="
                    w-full bg-black/40 text-white 
                    border border-white/20 rounded px-2 py-1 
                    focus:outline-none focus:ring-1 focus:ring-blue-500
                  "
                />
              ) : (
                <div
                  onClick={() => handleChatClick(chat.id)}
                  onDoubleClick={() => {
                    setEditingId(chat.id);
                    setTempTitle(chat.title);
                  }}
                  className="truncate"
                >
                  {chat.title}
                </div>
              )}
            </div>


            <div
              className="
                flex items-center gap-3 
                opacity-100 md:opacity-0 md:group-hover:opacity-100 
                transition
              "
            >
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
                  downloadJSON(`${chat.title}.json`, {
                    id: chat.id,
                    title: chat.title,
                    createdAt: chat.createdAt,
                    messages: chat.messages,
                  });
                }}
                className="hover:text-green-400"
                title="Download"
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
