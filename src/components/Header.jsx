import LanguageToggle from "./SubComponents/ToggleLanguage";
import { act, useContext } from "react";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";
import clsx from "clsx";
export default function Header() {
  const { t, activeLang } = useContext(PrayersTimesContext);

  return (
    <div className="mt-3  w-full">
      <LanguageToggle />
      <h1
        className={clsx(
          "title-shadow text-center  mb-2 max-w-[250px] mx-auto sm:max-w-none  text-4xl md:text-5xl 2xl:text-6xl text-secondary-500 text-shadow-lg  font-bold",
          {
            "font-inter": activeLang === "en",
            "font-tajawal": activeLang === "ar",
          }
        )}
      >
        {t("appTitle")}
      </h1>
      <blockquote
        className={clsx(
          "text-center max-w-[70%] md:max-w-[60%] lg:min-h-[70px] mx-auto text-white text-[14px] font-bold mt-5 2xl:mt-8 text-shadow-lg",
          {
            "font-inter": activeLang === "en",
            "font-tajawal": activeLang === "ar",
          }
        )}
      >
        <i>
          {t("hadith")}
          <p className="font-extrabold text-secondary-500 mt-1 xl:mt-3">
            {t("hadithSource")}
          </p>
        </i>
      </blockquote>
    </div>
  );
}
