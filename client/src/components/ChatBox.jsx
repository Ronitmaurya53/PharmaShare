import React, { useState, useRef, useEffect } from "react";

const SUGGESTED_MEDICINES = [
  "Paracetamol",
  "Ibuprofen",
  "Cetirizine",
  "Aspirin",
  "Vitamin D",
];

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply || "No response" };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      const aiMessage = { sender: "ai", text: "Network error. Please try again." };
      setMessages(prev => [...prev, aiMessage]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);
  const handleKeyPress = (e) => { if (e.key === "Enter") handleSend(); };
  const handleSuggestedClick = (medicine) => sendMessage(medicine);

  return (
    <div className="flex flex-col h-[400px] bg-white rounded-t-lg shadow-lg overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-2 font-semibold">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-1 p-2 rounded-md max-w-[80%] break-words ${
              msg.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Suggested medicines */}
      <div className="flex flex-wrap gap-2 p-2 border-t border-gray-200">
        {SUGGESTED_MEDICINES.map((med, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestedClick(med)}
            className="bg-green-200 text-green-800 px-3 py-1 rounded-md hover:bg-green-300"
          >
            {med}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex p-2 border-t border-gray-200 gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a medicine question..."
          className="flex-1 border rounded-md p-2"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-600 p-2 text-center font-bold border-t border-gray-200">
        ⚠️ This is for educational purposes only. Consult a doctor before taking any medicine.
      </div>
    </div>
  );
};

export default ChatBox;
