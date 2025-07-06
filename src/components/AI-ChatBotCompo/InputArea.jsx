import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Icon } from "./ChatBot";

export default function InputArea({ activeLang, handleClick, t, detectLang }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const enterBtnRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  console.log(typeof input);
  function handleEnterClick(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      enterBtnRef.current?.click();
    }
  }
  return (
    <footer className="p-4 border-t border-gray-700 flex-shrink-0">
      <div
        className={clsx(
          "flex items-center gap-2 bg-gray-700/50 rounded-xl p-2",
          { "flex-row-reverse": activeLang === "ar" }
        )}
      >
        <input
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          type="text"
          value={input}
          placeholder={t("askAiPlaceHolder")}
          className={clsx(
            "flex-1 bg-transparent text-gray-200 text-[13px] placeholder-gray-500 focus:outline-none px-2",
            {
              "font-inter": detectLang(input) === "en",
              "font-tajawal": detectLang(input) !== "en",
            }
          )}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnterClick}
          ref={inputRef}
        />
        <button
          ref={enterBtnRef}
          className={clsx(
            "p-2.5 rounded-full bg-gradient-to-r from-orange-500 py-1 px-2 to-amber-500 text-white cursor-pointer",
            { "transform rotate-180": activeLang === "ar" }
          )}
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
        className={clsx(
          "w-fit mx-auto text-[10px] text-accent-500 mt-2 -mb-[5px] text-center",
          {
            "font-inter": activeLang === "en",
            "font-tajawal": activeLang !== "en",
          }
        )}
      >
        {t("aiNotice")}
      </p>
    </footer>
  );
}
