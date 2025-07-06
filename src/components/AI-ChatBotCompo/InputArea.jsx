import { useEffect, useRef, useState } from "react";
import { Icon } from "./ChatBot";
import clsx from "clsx";
export default function InputArea({ activeLang, handleClick, t, detectLang }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const enterBtnRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
          className={clsx(
            "flex-1 bg-transparent text-gray-200 text-[13px] placeholder-gray-500 focus:outline-none px-2",
            detectLang(input) === "en" ? "font-inter" : "font-tajawal"
          )}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterClick}
          ref={inputRef}
          aria-label={t("askAiPlaceHolder")}
        />
        <button
          className={clsx(
            "p-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white",
            activeLang === "ar" ? "transform rotate-180" : ""
          )}
          onClick={handleClick}
          aria-label="Send Message"
        >
          <Icon name="send" className="w-5 h-5" />
        </button>
      </div>

      {/* this is for the notice under the input area */}
      <p
        className={clsx(
          "w-fit mx-auto text-[10px] text-accent-500 mt-2 -mb-[5px] text-center",
          activeLang === "en" ? "font-inter" : "font-tajawal"
        )}
      >
        {t("aiNotice")}
      </p>
    </footer>
  );
}
