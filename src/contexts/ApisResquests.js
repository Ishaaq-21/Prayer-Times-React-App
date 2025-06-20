import axios from "axios";
import prayerCalculationMethodsByCountry from "../CountriesMethodCodes";

const getCityLocationData = async (cityName) => {
  //This api returns some data related to the provided city(country, latitude, longitude, state, country code....etc)

  const cityLocationResp = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${cityName}`
  );
  const cityLocationData = cityLocationResp.data;

  if (!cityLocationData.length) throw new Error("An Error has happened");
  return {
    latitude: cityLocationData[0].lat,
    longitude: cityLocationData[0].lon,
    country: cityLocationData[0].address.country,
  };
};
const getPrayersTimesFromApi = async (
  latitude,
  longitude,

  countryMethodCode
) => {
  const cityPrayersResp = await axios.get(
    `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${countryMethodCode}`
  );
  const cityPrayerData = cityPrayersResp.data;
  if (!cityPrayerData) throw new Error("An Error has happened");
  const prayersTiming = cityPrayerData.data.timings;
  return {
    Fajr: prayersTiming.Fajr,
    Dhuhr: prayersTiming.Dhuhr,
    Asr: prayersTiming.Asr,
    Maghrib: prayersTiming.Maghrib,
    Isha: prayersTiming.Isha,
  };
};
export const prayersTimes = async (cityName, setError) => {
  setError(null);
  try {
    const cityLocationData = await getCityLocationData(cityName);

    //Now based on the country name, we will find the nearest calculation method of that country (search about what calculation method of prayer apis is)

    const countryMethodCode =
      prayerCalculationMethodsByCountry[cityLocationData.country] ||
      prayerCalculationMethodsByCountry["default"];

    const prayersData = await getPrayersTimesFromApi(
      cityLocationData.latitude,
      cityLocationData.longitude,
      countryMethodCode
    );
    console.log(prayersData);
    return prayersData;
  } catch (err) {
    setError(err.message || "Something went wrong");
  }
};
