import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { getPrayersTimes } from "./ApisResquests";

export const PrayersTimesContext = createContext({});
export const MainBarInfoConext = createContext({});

const PrayersDataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityTimeString, setCityTimeString] = useState(null);
  const lastCityName = useRef("");

  const fetchData = async (cityName) => {
    const { prayersData, searchedCityTimeString } = await getPrayersTimes(
      cityName,
      setError,
      setIsLoading
    );
    setPrayersTimes(prayersData);
    setCityTimeString(searchedCityTimeString);
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

  return (
    <PrayersTimesContext.Provider
      value={{ prayersTimes, error, isLoading, cityTimeString }}
    >
      <MainBarInfoConext.Provider value={{ handleSearchClick, lastCityName }}>
        {children}
      </MainBarInfoConext.Provider>
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
