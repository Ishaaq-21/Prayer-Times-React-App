import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { getPrayersTimes } from "./ApisResquests";

export const PrayersTimesContext = createContext({});
export const SearchClickContext = createContext({});
const PrayersDataProvider = ({ children }) => {
  // const [cityName, setCityName] = useState("");
  // const cityName = "Boumedfaa";
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const lastCityName = useRef("");
  //this function will be taken by the search input compo
  function handleSearchClick(cityName) {
    if (cityName === lastCityName.current) return;
    lastCityName.current = cityName;
    const fetchData = async () => {
      const cityPrayerTimes = await getPrayersTimes(cityName, setError);

      setPrayersTimes(cityPrayerTimes);
      console.log(cityPrayerTimes);
      console.log(prayersTimes);
    };
    fetchData();
  }

  if (error) return <p className="text-white font-bold">{error}</p>;

  return (
    <PrayersTimesContext.Provider value={prayersTimes}>
      <SearchClickContext.Provider value={{ handleSearchClick }}>
        {children}
      </SearchClickContext.Provider>
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
