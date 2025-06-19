import React from "react";
import "./searchCompo.css";
const SearchCompo = () => {
  return (
    <div className=" flex justify-center items-center">
      <input
        className="search-text  py-3 px-4 border-0 rounded-l-lg rounded-r-none bg-white/15 text-white text-base  backdrop-blur outline-none transition-all duration-300 focus"
        type="text"
        placeholder="Search for a city..."
      />
      <button className="btn py-3 px-5 border-0 rounded-r-xl text-white text-base cursor-pointer font-bold bg-accent-500 transition-all duration-300 ease-in-out hover:bg-accent-600">
        Search
      </button>
    </div>
  );
};

export default SearchCompo;
