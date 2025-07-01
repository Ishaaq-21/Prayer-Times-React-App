import React, { act, useContext, useEffect, useState } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
import InputArea from "./InputArea";
import ChatBotToggleBtn from "./ChatBotToggleBtn";
import { getResponseFromAI } from "./ChatBotHelpers/chatBotApiRequests";
import "./ChatBotHelpers/chatTypeLoading.css";
// Helper component for Icons
export const Icon = ({ name, className, activeLang }) => {
  const icons = {
    bot: (
      <svg
        className={`w-6 h-9 text-amber-500 ${activeLang === "en" ? "mt-[-5px] mr-[-5px] mb-[0px] ml-[5px]" : "mt-[-5px] mr-[5px] mb-[0px] ml-[-5px]"}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M5,22 V14 A1,1 0 0 1 6,13 L18,13 A1,1 0 0 1 19,14 V22 Z" />

        <path d="M8,13 A4,4 0 0 1 16,13 A4,3 0 0 1 8,13 Z" />

        <path d="M12,6 A1,1 0 0 0 12.8,7.2 A0.6,0.6 0 0 1 12,7.2 A1,1 0 0 0 12,6 Z" />

        <path d="M3,22 V8 A0.8,0.8 0 0 1 4.6,8 V22 Z" />
        <path d="M3.3,8 A0.8,0.6 0 0 1 4.3,8 A0.8,0.6 0 0 1 3.3,8 Z" />

        <path d="M19.4,22 V8 A0.8,0.8 0 0 1 21,8 V22 Z" />
        <path d="M19.7,8 A0.8,0.6 0 0 1 20.7,8 A0.8,0.6 0 0 1 19.7,8 Z" />

        <path d="M10,22 V18 A2,2 0 0 1 14,18 V22 Z" />
        <path d="M10,18 A2,1.5 0 0 1 14,18 A2,1.5 0 0 1 10,18 Z" />

        <path d="M7,19 A1,0.8 0 0 1 8,19 A1,0.8 0 0 1 7,19 Z" />
        <path d="M16,19 A1,0.8 0 0 1 17,19 A1,0.8 0 0 1 16,19 Z" />
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
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
        ></p>
      </div>
    </div>
  );
};

const TypeLoadingIndicator = ({ activeLang }) => {
  return (
    <div
      class={`typeLoading flex ${activeLang === "en" ? "justify-start" : "justify-end"}`}
    >
      <div
        class={`bg-gray-700/80 p-3 rounded-lg ${activeLang === "en" ? " rounded-bl-none" : " rounded-br-none"} flex items-center space-x-2`}
      >
        <div class="dot dot-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div class="dot dot-2 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div class="dot dot-3 w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

// Main Chatbot UI Component with updated theme (Presentation Only)
export default function ChatBotApp() {
  // Static message data for demonstration purposes.

  const [expand, setExpand] = useState(false);
  const { t, activeLang } = useContext(PrayersTimesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useState(null);
  const [messages, setVirtualMessages] = useState([
    {
      sender: "bot",
      text: `السَّلامُ عَلَيْكُم وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ!
      I’m your AI Islamic assistant, here to share beneficial reminders and guidance, in shā’ Allāh.
      Please note: I cannot provide fatāwā. For questions like “Is it ḥalāl?” or “Can I...?”, kindly consult a trusted imam or scholar.
      If you have any other questions, feel free to ask — I’m here to help, bi’idhni Allāh.`,
    },
  ]);

  function handleSendMessageClick(inputMsg) {
    if (inputMsg.trim() === "") return;
    setVirtualMessages((prev) => [...prev, { sender: "user", text: inputMsg }]);
  }
  function handleChatBotToggleClick() {
    setExpand((prev) => !prev);
  }
  return (
    <>
      <div
        className={`w-full max-w-[320px] md:max-w-sm max-h-[480px] flex flex-col bg-[#3a2927] rounded-2xl rounded-b-none shadow-2xl border border-gray-700 fixed lg:absolute ${expand ? "bottom-0" : "-bottom-12 lg:-bottom-0"} transform left-1/2 -translate-x-1/2 ${activeLang === "en" ? "sm:right-[25px] sm:left-auto sm:-translate-x-0" : "sm:left-[25px] sm:right-auto sm:-translate-x-0"} transition-all duration-3000 overflow-hidden`}
      >
        {/* Chat Header */}
        <div
          className={`flex items-center ${activeLang === "ar" ? "flex-row-reverse" : ""} gap-4 px-2 py-[6px] border-b border-gray-700 flex-shrink-0 cursor-pointer bg-[#5c3f3c]`}
          onClick={() => !expand && setExpand(true)}
        >
          <div
            className={`flex ${activeLang === "ar" ? "flex-row-reverse" : ""} flex-1 self-start gap-4`}
          >
            <Icon
              name="bot"
              className="w-9 h-9 text-amber-500"
              activeLang={activeLang}
            />
            <div>
              <h1 className="text-lg font-semibold text-yellow-400">
                {t("aiChatBot")}
              </h1>
            </div>
          </div>
          <div className="closeBtn-container mr-3">
            <button
              class="text-amber-500/60 hover:text-amber-500 hover:bg-white/10 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200"
              onClick={() => expand && setExpand(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span class="sr-only">Close chat</span>
            </button>
          </div>
        </div>

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
          {/**Chat Bot input area */}
          <InputArea
            activeLang={activeLang}
            handleClick={handleSendMessageClick}
            t={t}
            expand={expand}
          />
        </div>
      </div>
      {/* 
        Button visible only on small and medium screens (sm, md). 
        Toggles the chatbot container on click for better mobile responsiveness.
      */}
      <ChatBotToggleBtn
        activeLang={activeLang}
        handleToggleClick={handleChatBotToggleClick}
        expand={expand}
      />
    </>
  );
}
