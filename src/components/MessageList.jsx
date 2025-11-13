// src/components/MessageList.jsx
import React from "react";
import MessageItem from "./MessageItem";

export default function MessageList({messages = [], onRetry, onEdit}) {


  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, i) => (
        <MessageItem key={i} sender={msg.sender} 
        text={msg.text}  
        timestamp={msg.timestamp} 
        onRetry={() => onRetry(msg)} 
         onEdit={(newText) => onEdit(i, newText)} />
      ))}
    </div>
  );
}
