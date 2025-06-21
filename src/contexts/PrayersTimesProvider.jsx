import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { getPrayersTimes } from "./ApisResquests";

export const PrayersTimesContext = createContext({});
export const MainBarInfoConext = createContext({});

const PrayersDataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastCityName = useRef("");

  const fetchData = async (cityName) => {
    const cityPrayerTimes = await getPrayersTimes(
      cityName,
      setError,
      setIsLoading
    );

    setPrayersTimes(cityPrayerTimes);
  };
  function handleSearchClick(cityNameInput) {
    if (cityNameInput === lastCityName.current) return;
    lastCityName.current = cityNameInput;

    fetchData(cityNameInput);
  }

  useEffect(() => {
    lastCityName.current = "Makkah";
    fetchData("Makkah");
  }, []);
  // if (error) return <p className="text-white font-bold">{error}</p>;

  return (
    <PrayersTimesContext.Provider value={{ prayersTimes, error, isLoading }}>
      <MainBarInfoConext.Provider value={{ handleSearchClick, lastCityName }}>
        {children}
      </MainBarInfoConext.Provider>
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
