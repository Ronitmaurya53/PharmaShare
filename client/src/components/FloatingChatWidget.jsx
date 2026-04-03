import React, { useState } from "react";
import ChatBox from "./ChatBox";

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 w-[320px] max-w-full shadow-lg rounded-t-lg overflow-hidden animate-slide-up">
          <ChatBox />
        </div>
      )}

      <button
        onClick={toggleChat}
        className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition-all"
      >
        {isOpen ? "×" : "💬"}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
