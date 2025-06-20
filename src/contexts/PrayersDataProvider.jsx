import { createContext, useEffect, useState } from "react";

import { prayersTimes } from "./ApisResquests";

const PrayersTimesContext = createContext({});

const PrayersDataProvider = ({ children }) => {
  //   const [cityName, setCityName] = useState("");
  const cityName = "Boumedfaa";
  const [error, setError] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState({});

  useEffect(() => {
    const cityPrayerTimes = prayersTimes(cityName, setError);
    setPrayersTimes(cityPrayerTimes);
  }, [cityName]);
  if (error) return <p>{error}</p>;

  return (
    <PrayersTimesContext.Provider value={prayersTimes}>
      {children}
    </PrayersTimesContext.Provider>
  );
};

export default PrayersDataProvider;
