import React, { useContext, useState } from "react";
import "./searchCompo.css";
import { MainBarInfoConext } from "../../contexts/PrayersTimesProvider";

const SearchCompo = ({ resetCityTimeOnSearchClick }) => {
  const [inputCity, setInputCity] = useState("");
  const { handleSearchClick, lastCityName } = useContext(MainBarInfoConext);
  function handleSearchBtnClick() {
    if (inputCity.trim() !== "" && inputCity !== lastCityName.current) {
      resetCityTimeOnSearchClick();
      handleSearchClick(inputCity);
    }
  }
  return (
    <div className=" flex justify-center items-center ">
      <input
        className="search-text  py-3 px-4  md:px-5 border-0 rounded-l-lg rounded-r-none bg-white/15 text-white text-base sm:text-sm md:text-base  backdrop-blur outline-none transition-all duration-300 focus placeholder-white sm:max-w-[150px] md:max-w-none"
        type="text"
        placeholder="Search for a city..."
        onChange={(e) => setInputCity(e.target.value)}
      />
      <button
        className="btn py-3 px-5  border-0 rounded-r-xl text-white text-base sm:text-sm md:text-base cursor-pointer font-bold bg-secondary-600 transition-all duration-300 ease-in-out hover:bg-secondary-700 sm:max-w-[80px] md:max-w-none"
        onClick={handleSearchBtnClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchCompo;
