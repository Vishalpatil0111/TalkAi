// src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
   <div className="h-screen flex overflow-hidden relative">

  {/* Background behind everything */}
  <div className="absolute inset-0 bg-animated opacity-80 -z-20"></div>

  {/* Floating bubbles also behind */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    <div className="bubble w-40 h-40 bg-blue-600/30 top-10 left-10"></div>
    <div className="bubble w-28 h-28 bg-purple-500/20 top-1/2 right-20"></div>
    <div className="bubble w-32 h-32 bg-cyan-400/20 bottom-20 left-1/3"></div>
  </div>

  {/* Foreground App */}
  <div className="relative z-10 flex flex-1 overflow-hidden">
    {/* Sidebar */}
    <div
      className={`fixed md:static inset-y-0 left-0 z-40 w-64 border-r transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:translate-x-0`}
    >
      <Sidebar 
        onChatSelect={() => setIsSidebarOpen(false)} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>

    {/* Overlay for mobile */}
    {isSidebarOpen && (
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/40 z-30 md:hidden"
      ></div>
    )}

    {/* Chat Window */}
    <div className="flex flex-col flex-1 h-full">
      <div className="flex md:hidden items-center justify-between p-3  z-10 backdrop-blur-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-200 md:hidden text-2xl"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold text-white">TalkAI- Your Buddy !!</h1>
      </div>

      <div className="flex-1 min-h-0">
        <ChatWindow />
      </div>
    </div>
  </div>
</div>

  );
}
