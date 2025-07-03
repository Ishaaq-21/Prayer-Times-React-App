import { useEffect, useRef, useState } from "react";
import { Icon } from "./ChatBot";

export default function InputArea({ activeLang, handleClick, t, detectLang }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const enterBtnRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  function handleEnterClick(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      enterBtnRef.current?.click();
    }
  }
  return (
    <footer className={`p-4 border-t border-gray-700 flex-shrink-0`}>
      <div
        className={`flex ${activeLang === "ar" ? "flex-row-reverse" : ""} items-center gap-2 bg-gray-700/50 rounded-xl p-2`}
      >
        <input
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          type="text"
          value={input}
          placeholder={t("askAiPlaceHolder")}
          className={`flex-1 bg-transparent text-gray-200 text-[13px] placeholder-gray-500 focus:outline-none  px-2 ${detectLang(input) === "en" ? "font-inter" : "font-tajawal"} `}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterClick}
          ref={inputRef}
        />
        <button
          ref={enterBtnRef}
          className={`p-2.5 rounded-full ${activeLang === "ar" ? "transform rotate-180" : ""}  bg-gradient-to-r from-orange-500 py-1 px-2 to-amber-500 text-white cursor-pointer`}
          onClick={() => {
            setInput("");
            handleClick(input);
          }}
        >
          <Icon name="send" className="w-5 h-5" />
        </button>
      </div>

      {/* this is for the notice under the input area */}
      <p
        className={`w-fit mx-auto text-[10px] text-accent-500 mt-2 -mb-[5px] text-center ${activeLang === "en" ? "font-inter" : "font-tajawal"}`}
      >
        {t("aiNotice")}
      </p>
    </footer>
  );
}
