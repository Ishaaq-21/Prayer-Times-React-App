import React, { useContext, useEffect, useRef, useState } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";

const LanguageToggle = () => {
  const { activeLang, setActiveLang } = useContext(PrayersTimesContext);
  const [showToggle, setShowToggle] = useState(false);
  const timeOutRef = useRef();

  const startHideTimer = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    timeOutRef.current = setTimeout(() => {
      setShowToggle(false);
    }, 3000);
  };
  const handleLangChange = (lang) => {
    setActiveLang(lang);
    startHideTimer();
  };

  return (
    <>
      <LangButton
        showToggle={showToggle}
        setShowToggle={setShowToggle}
        startHideTimer={startHideTimer}
      />

      <div
        className={`${showToggle ? "top-6 left-[22px] " : "top-[-150px]  left-[22px]"} absolute z-50 transition-all duration-3000 md:top-6 md:left-8 tablet-buttons-container  `}
      >
        <div className="inline-flex flex-col md:flex-row bg-black/20 rounded-full overflow-hidden border border-white/20 backdrop-blur-md p-1">
          {/* English Button */}
          <button
            onClick={() => handleLangChange("en")}
            className={`px-2 py-[10px] md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 tablet-buttons
                        ${
                          activeLang === "en"
                            ? "bg-[#FFC107] text-[#1e3a5f] shadow-[0_0_15px_rgba(255,193,7,0.5)]"
                            : "text-white/70 hover:text-white"
                        }
                    `}
          >
            EN
          </button>

          {/* Arabic Button */}
          <button
            onClick={() => handleLangChange("ar")}
            className={`px-1 py-[10px] md:px-5 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 tablet-buttons
                        ${
                          activeLang === "ar"
                            ? "bg-[#FFC107] text-[#1e3a5f] shadow-[0_0_15px_rgba(255,193,7,0.5)]"
                            : "text-white/70 hover:text-white"
                        }
                    `}
          >
            AR
          </button>
        </div>
      </div>
    </>
  );
};
function LangButton({ showToggle, setShowToggle, startHideTimer }) {
  return (
    <button
      type="button"
      className={`peer left-4 top-7 p-[5px] ${showToggle ? "hidden" : "block"} box-border border-2 border-white rounded-full bg-[#FFC107] block md:hidden shadow-[0_0_5px_5px_grey]
             hover:bg-[#DAA520] text-white 
             hover:!shadow-[0_0_5px_5px_#f17b4c] 
            
             transition duration-300 
             focus:outline-none focus:ring-white absolute top-12`}
      aria-label="Select language"
      onClick={() => {
        const next = !showToggle;
        setShowToggle(next);
        if (next) startHideTimer();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 32 32"
        fill="currentColor"
      >
        <text
          x="14"
          y="15"
          fontSize="20"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          文
        </text>
        <text
          x="22"
          y="25"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          A
        </text>
      </svg>
    </button>
  );
}
export default LanguageToggle;
