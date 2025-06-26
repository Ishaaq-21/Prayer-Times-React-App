import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  return (
    <>
      <h1 className="text-center mt-3 mb-2  md:mb- text-5xl text-accent-500 shadow-text  font-bold">
        {t("appTitle")}
      </h1>
      <blockquote className="text-center text-white text-[14px] font-bold mt-5">
        <i>
          "{t("hadith")}
          <footer className="font-extrabold text-secondary-500">
            {t("hadithSource")}
          </footer>
        </i>
      </blockquote>
    </>
  );
}
