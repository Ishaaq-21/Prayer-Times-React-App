import { createContext, useEffect, useMemo, useRef, useState } from "react";

import { getPrayersTimes } from "../components/Helpers/ApisResquests";
import { notFoundError } from "../components/Helpers/ApisResquests";
import { useTranslation } from "react-i18next";
export const PrayersTimesContext = createContext({});
export const MainBarInfoConext = createContext({});

const PrayersDataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityTimeString, setCityTimeString] = useState("");
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
  // I need to work on translation then move to the logic
  function handleSearchClick(cityNameInput) {
    lastCityName.current = cityNameInput;

    fetchData(cityNameInput);
  }

  useEffect(() => {
    i18n.changeLanguage("en");
    lastCityName.current = "Makkah";
    fetchData("Makkah");
  }, []);

  return (
    <PrayersTimesContext.Provider
      value={{ prayersTimes, error, isLoading, cityTimeString, t }}
    >
      <MainBarInfoConext.Provider value={{ handleSearchClick, lastCityName }}>
        {children}
      </MainBarInfoConext.Provider>
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
