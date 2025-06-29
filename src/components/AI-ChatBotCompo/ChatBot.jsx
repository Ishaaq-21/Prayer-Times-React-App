import React, { useContext, useState } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
import InputArea from "./InputArea";

// Helper component for Icons
export const Icon = ({ name, className }) => {
  const icons = {
    bot: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12,3 A2,2 0 1 1 12,7 A1.5,1.5 0 0 0 12,3 Z M3,22 V10 A1,1 0 0 1 5,10 V22 Z M19,22 V10 A1,1 0 0 1 21,10 V22 Z M6,22 V12 A6,6 0 0 1 18,12 V22 Z M9.5,17 A2.5,2.5 0 0 1 14.5,17 L14.5,22 L9.5,22 L9.5,17 Z" />
      </svg>
    ),
    send: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// Visual-only Message Bubble Component with updated theme
const MessageBubble = ({ sender, text, activeLang }) => {
  const isUser = sender === "user";

  // Base styles for all bubbles
  const baseBubbleStyles = "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-md";

  // Themed styles for user and bot
  const userStyles = `bg-gradient-to-r from-orange-500 to-amber-500 text-white ${activeLang === "en" ? "self-end rounded-br-none" : "self-start rounded-bl-none"} `;
  const botStyles = `bg-gray-700 text-gray-200 ${activeLang === "en" ? "self-start rounded-bl-none" : "self-end rounded-br-none"} `;

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div className={`${baseBubbleStyles} ${isUser ? userStyles : botStyles}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

// Main Chatbot UI Component with updated theme (Presentation Only)
export default function ChatBotApp() {
  // Static message data for demonstration purposes.

  const [expand, setExpand] = useState(false);
  const { t, activeLang } = useContext(PrayersTimesContext);
  const [visualMessages, setVirtualMessages] = useState([
    {
      sender: "bot",
      text: "Assalamu alaikum! How can I assist you with your query?",
    },
    {
      sender: "user",
      text: "Wa alaikum assalam. I have a question about the Hadith.",
    },
    {
      sender: "bot",
      text: "Of course. Please provide the details, and I will do my best to find the information you seek.",
    },
  ]);

  function handleSendMessageClick(inputMsg) {
    if (inputMsg.trim() === "") return;
    setVirtualMessages((prev) => [...prev, { sender: "user", text: inputMsg }]);
  }

  return (
    <div
      className={`w-full max-w-sm max-h-[480px] flex flex-col bg-[#3a2927] rounded-2xl rounded-b-none shadow-2xl border border-gray-700 absolute ${expand ? "bottom-0" : "-bottom-0"} right-[20px] transition-all duration-3000`}
    >
      {/* Chat Header */}
      <header
        className={`flex items-center ${activeLang === "ar" ? "flex-row-reverse" : ""} gap-4 px-2 py-1 border-b border-gray-700 flex-shrink-0 cursor-pointer`}
        onClick={() => setExpand((prev) => !prev)}
      >
        <Icon name="bot" className="w-9 h-9 text-amber-500" />
        <div>
          <h1 className="text-lg font-semibold text-yellow-400">
            {t("aiChatBot")}
          </h1>
        </div>
      </header>

      {/* Chat History (Scrollable) */}
      <div
        className={`
    overflow-hidden transition-all duration-500
    ${expand ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
    flex-1
  `}
      >
        <div className={`flex-1 p-6 overflow-y-auto space-y-6 h-[320px]`}>
          {visualMessages.map((msg, index) => (
            <MessageBubble
              key={index}
              sender={msg.sender}
              text={msg.text}
              activeLang={activeLang}
            />
          ))}
        </div>
        <InputArea
          activeLang={activeLang}
          handleClick={handleSendMessageClick}
          t={t}
          expand={expand}
        />
        {/* Input Area (Visual Only) */}
      </div>
    </div>
  );
}
