import React, { useContext, useState } from "react";
import "./searchCompo.css";
import { PrayersTimesContext } from "../../../contexts/PrayersTimesProvider";

const SearchCompo = ({ resetNextPrayer, t, activeLang }) => {
  const [inputCity, setInputCity] = useState("");
  const { handleSearchClick, lastCityName } = useContext(PrayersTimesContext);
  function handleSearchBtnClick() {
    if (inputCity.trim() !== "" && lastCityName.current !== inputCity) {
      resetNextPrayer();
      handleSearchClick(inputCity);
    }
  }
  return (
    <div
      dir={activeLang === "en" ? "ltr" : "rtl"}
      className={`${activeLang == "ar" ? "sm:order-1 md:order-1 lg:order-2" : "lg:order-0"}  flex justify-center items-center`}
    >
      <input
        className={`search-text  py-3 px-4 2xl:py-5 2xl:px-7  md:px-5 border-0 ${activeLang === "ar" ? "rounded-r-lg" : "rounded-l-lg"}  bg-white/15 text-white text-base sm:text-sm md:text-base  backdrop-blur outline-none transition-all duration-300 focus placeholder-white sm:max-w-[150px] md:max-w-none`}
        type="text"
        placeholder={t("searchPlaceholder")}
        onChange={(e) => setInputCity(e.target.value)}
      />
      <button
        className={`btn py-3 px-5 2xl:py-5 2xl:px-7  border-0 ${activeLang == "ar" ? "rounded-l-xl" : "rounded-r-xl"}  text-white text-base sm:text-sm md:text-base cursor-pointer font-bold bg-accent-500 hover:bg-accent-600 transition-all duration-300 ease-in-out  sm:max-w-[80px] md:max-w-none shadow`}
        onClick={handleSearchBtnClick}
      >
        {t("search")}
      </button>
    </div>
  );
};

export default SearchCompo;
