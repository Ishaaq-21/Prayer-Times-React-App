import { createContext, useEffect, useState } from "react";
import axios from "axios";

import prayerCalculationMethodsByCountry from "../CountriesMethodCodes";

const PrayersDataProvider = () => {
  //   const [cityName, setCityName] = useState("");
  const cityName = "Boumedfaa";
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const cityLocationResp = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${cityName}`
        );
        const cityLocationData = cityLocationResp.data;

        if (!cityLocationData.length) throw new Error("City Not Found");
        console.log(cityLocationData);
        const { lat: latitude, lon: longitude } = cityLocationData[0];

        const countryName = cityLocationData[0].address.country;
        console.log(`${cityName} is located in ${countryName}`);
        const countryMethodCode =
          prayerCalculationMethodsByCountry[countryName] ||
          prayerCalculationMethodsByCountry["default"];
        console.log(countryMethodCode);
        const cityPrayersResp = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${countryMethodCode}`
        );
        const cityPrayerData = cityPrayersResp.data;
        if (!cityPrayerData) throw new Error("An Error has happened");

        console.log(cityPrayerData);
        // console.log(cityPrayerData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };

    fetchData();
  }, [cityName]);
  if (error) return <p>{error}</p>;

  return <>Hello world</>;
};

export default PrayersDataProvider;
