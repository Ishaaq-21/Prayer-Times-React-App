import React, { useContext, useState } from "react";
import "./searchCompo.css";
import { MainBarInfoConext } from "../../contexts/PrayersTimesProvider";

const SearchCompo = () => {
  const [inputCity, setInputCity] = useState("");
  const { handleSearchClick } = useContext(MainBarInfoConext);
  function handleSearchBtnClick() {
    if (inputCity.trim() !== "") {
      handleSearchClick(inputCity);
    }
  }
  return (
    <div className=" flex justify-center items-center">
      <input
        className="search-text  py-3 px-4 border-0 rounded-l-lg rounded-r-none bg-white/15 text-white text-base  backdrop-blur outline-none transition-all duration-300 focus placeholder-white"
        type="text"
        placeholder="Search for a city..."
        onChange={(e) => setInputCity(e.target.value)}
      />
      <button
        className="btn py-3 px-5 border-0 rounded-r-xl text-white text-base cursor-pointer font-bold bg-secondary-600 transition-all duration-300 ease-in-out hover:bg-secondary-700"
        onClick={handleSearchBtnClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchCompo;
