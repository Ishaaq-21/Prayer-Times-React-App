import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { getPrayersTimes } from "./ApisResquests";
import { notFoundError } from "./ApisResquests";
export const PrayersTimesContext = createContext({});
export const MainBarInfoConext = createContext({});

const PrayersDataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityTimeString, setCityTimeString] = useState("");
  const lastCityName = useRef("");

  const fetchData = async (cityName) => {
    try {
      setIsLoading(true);
      setError(null);
      const { prayersData, searchedCityTimeString } =
        await getPrayersTimes(cityName);
      setPrayersTimes(prayersData);
      setCityTimeString(searchedCityTimeString);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof notFoundError) {
        setError("No City Results");
      } else {
        setError("Something went wrong");
      }
      setIsLoading(false);
    }
  };
  function handleSearchClick(cityNameInput) {
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
