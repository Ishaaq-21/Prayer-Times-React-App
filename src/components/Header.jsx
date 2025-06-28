import LanguageToggle from "./SubComponents/ToggleLanguage";
import { useContext } from "react";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";

export default function Header() {
  const { t } = useContext(PrayersTimesContext);

  return (
    <>
      <LanguageToggle />
      <h1 className="text-center mt-3 mb-2 max-w-[250px] mx-auto sm:max-w-none  text-4xl md:text-5xl text-accent-500 shadow-text  font-bold">
        {t("appTitle")}
      </h1>
      <blockquote
        className="text-center max-w-[70%] md:max-w-[60%] lg:min-h-[70px] mx-auto text-white text-[14px] font-bold mt-5 text-shadow-lg
"
      >
        <i>
          {t("hadith")}
          <p className="font-extrabold text-secondary-500 mt-1">
            {t("hadithSource")}
          </p>
        </i>
      </blockquote>
    </>
  );
}
