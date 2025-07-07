import React, { act, useContext, useEffect, useRef, useState } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
import InputArea from "./InputArea";
import ChatBotToggleBtn from "./ChatBotToggleBtn";
import { getResponseFromAI } from "./ChatBotHelpers/chatBotApiRequests";
import "./ChatBotHelpers/chatTypeLoading.css";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

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

// NEW: Function to detect if text is Arabic or English
const detectLang = (text) => (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");
// Visual-only Message Bubble Component with updated theme
const MessageBubble = ({ sender, text, activeLang }) => {
  const isUser = sender === "user";
  // Base styles for all bubbles
  const baseBubbleStyles =
    "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-md text-sm";

  // Themed styles for user and bot
  const userStyles = clsx(
    "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
    {
      "self-end rounded-br-none": activeLang === "en",
      "self-start rounded-bl-none": activeLang === "ar",
    }
  );
  const botStyles = clsx(
    "bg-gray-700 text-gray-200",
    activeLang === "en"
      ? "self-start rounded-bl-none"
      : "self-end rounded-br-none"
  );
  const currentLang = detectLang(text);
  return (
    <div
      className={clsx("flex flex-col", {
        "items-end": isUser,
        "items-start": !isUser,
      })}
    >
      <div className={clsx(baseBubbleStyles, isUser ? userStyles : botStyles)}>
        <p
          dir={`${currentLang === "en" ? "ltr" : "rtl"}`}
          className={clsx("text-[13px] leading-[1.8]", {
            "font-inter": currentLang === "en",
            "font-tajawal": currentLang === "ar",
          })}
          dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
        ></p>
      </div>
    </div>
  );
};

const TypeLoadingIndicator = ({ activeLang }) => {
  return (
    <div
      className={clsx("flex", {
        "justify-start": activeLang === "en",
        "justify-end": activeLang === "ar",
      })}
    >
      <div
        className={clsx(
          "bg-gray-700/80 p-3 rounded-lg flex items-center space-x-2",
          {
            "rounded-bl-none": activeLang === "en",
            "rounded-br-none": activeLang === "ar",
          }
        )}
      >
        <div className="dot dot-1 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="dot dot-2 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="dot dot-3 w-2 h-2 bg-gray-400 rounded-full"></div>
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
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function initialBotMsg() {
    setIsLoading(true);
    setMessages([]);
    await sleep(2000);
    setMessages([
      {
        sender: "bot",
        specialMsg: "initialMsg",
      },
    ]);
    setIsLoading(false);
  }
  useEffect(() => {
    if (expand && !messages.length) {
      initialBotMsg();
    }
  }, [expand]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  async function handleSendingMsgToChat(userMsg) {
    try {
      setIsLoading(true);
      setError(null);
      const aiMsg = await getResponseFromAI(userMsg);
      setIsLoading(false);
      return { aiMsg, retError: null };
    } catch (err) {
      setIsLoading(false);
      return { aiMsg: null, retError: err };
    }
  }
  function addUserToChatHistory(userObj) {
    setMessages((prev) => [...prev, userObj]);
  }
  async function handleSendMessageClick(inputMsg) {
    if (inputMsg.trim() === "") return;
    const userObj = { sender: "user", text: inputMsg };
    addUserToChatHistory(userObj);
    let { aiMsg, retError } = await handleSendingMsgToChat(inputMsg);
    let botMsg = null;
    if (retError) {
      botMsg = {
        sender: "bot",
        specialMsg: "unexpectedErrorMessage",
      };
    } else {
      botMsg = { sender: "bot", text: aiMsg };
    }
    setMessages((prev) => [...prev, botMsg]);
  }
  function handleChatBotToggleClick() {
    setExpand((prev) => !prev);
  }
  return (
    <>
      <div
        className={clsx(
          "w-full max-w-[320px] md:max-w-[350px] max-h-[480px] flex flex-col bg-[#3a2927] rounded-2xl rounded-b-none shadow-2xl border border-gray-700 fixed lg:absolute transform left-1/2 -translate-x-1/2 transition-all duration-300 overflow-hidden",
          { "bottom-0": expand, "-bottom-12 lg:-bottom-0": !expand },
          {
            "sm:right-[25px] sm:left-auto sm:-translate-x-0":
              activeLang === "en",
            "sm:left-[25px] sm:right-auto sm:-translate-x-0":
              activeLang === "ar",
          }
        )}
      >
        {/* Chat Header */}
        <div
          className={clsx(
            "flex items-center gap-4 px-2 py-[6px] border-b border-gray-700 flex-shrink-0 cursor-pointer  from-[#5c3f3c] via-[#7c4a3e] to-[#f7b267]",
            {
              "bg-gradient-to-r": activeLang === "en",
              "bg-gradient-to-l flex-row-reverse": activeLang === "ar",
            }
          )}
          onClick={() => !expand && setExpand(true)}
        >
          <div
            className={`flex ${activeLang === "ar" ? "flex-row-reverse" : ""} flex-1 self-start gap-3`}
          >
            <img
              className={`max-w-[35px] -mt-[2px] ${activeLang === "ar" ? "transform scale-x-[-1]" : ""}`}
              src="/public/chatIcon.png"
              alt=""
            />
            <div>
              <h1
                className={`text-[15px] font-semibold text-yellow-400 ${activeLang === "en" ? "font-inter" : "font-tajawal"} mt-[5px]`}
              >
                {t("aiChatBot")}
              </h1>
            </div>
          </div>
          <div className="closeBtn-container mr-3">
            <button
              className="text-amber-500/60 hover:text-amber-500   hover:bg-white/20 p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5c3f3c] transition-all duration-200"
              onClick={() => expand && setExpand(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#5c3f3c"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close chat</span>
            </button>
          </div>
        </div>

        {/* Chat History (Scrollable) */}
        <div
          className={clsx(
            " overflow-hidden transition-all duration-500  flex-1",
            {
              "max-h-[420px] opacity-100": expand,
              "max-h-0 opacity-0": !expand,
            }
          )}
        >
          <div
            className={`flex-1 p-6 overflow-y-auto space-y-6 h-[320px]`}
            ref={chatContainerRef}
          >
            {messages &&
              messages.map((msg) => (
                <MessageBubble
                  key={uuidv4()}
                  sender={msg.sender}
                  text={msg.specialMsg ? t(msg.specialMsg) : msg.text}
                  activeLang={activeLang}
                />
              ))}
            {isLoading && <TypeLoadingIndicator activeLang={activeLang} />}
            {error && (
              <MessageBubble
                key={uuidv4()}
                sender={"bot"}
                text={error.message}
                activeLang={activeLang}
              />
            )}
          </div>
          {/**Chat Bot input area */}
          <InputArea
            activeLang={activeLang}
            handleClick={handleSendMessageClick}
            t={t}
            expand={expand}
            detectLang={detectLang}
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
