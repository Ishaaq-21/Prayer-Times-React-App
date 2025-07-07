import { createContext, useEffect, useRef, useState } from "react";

import { getPrayersTimes } from "../components/Helpers/ApisResquests";
import { notFoundError } from "../components/Helpers/ApisResquests";
import { useTranslation } from "react-i18next";
export const PrayersTimesContext = createContext({});

const PrayersDataProvider = ({ children }) => {
  //statues
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityTimeString, setCityTimeString] = useState("");

  const [activeLang, setActiveLang] = useState("en");

  const lastCityName = useRef("");

  const { t, i18n } = useTranslation();
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
  useEffect(() => {
    i18n.changeLanguage(activeLang);
  }, [activeLang]);

  function handleSearchClick(cityNameInput) {
    if (lastCityName.current === cityNameInput) return;
    lastCityName.current = cityNameInput;

    fetchData(cityNameInput);
  }

  useEffect(() => {
    lastCityName.current = "Makkah";
    fetchData("Makkah");
  }, []);

  return (
    <PrayersTimesContext.Provider
      value={{
        prayersTimes,
        error,
        isLoading,
        cityTimeString,
        t,
        setActiveLang,
        activeLang,
        handleSearchClick,
        lastCityName,
      }}
    >
      {children}
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
