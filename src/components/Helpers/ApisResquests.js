import axios from "axios";
import prayerCalculationMethodsByCountry from "./CountriesMethodCodes";

export class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}
const timeZoneApiKey = import.meta.env.VITE_TIMEZONEDB_API_KEY;
const getCityLocationData = async (cityName) => {
  //This api returns some data related to the provided city(country, latitude, longitude, state, country code....etc)

  try {
    const cityLocationResp = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${cityName}`
    );
    const cityLocationData = cityLocationResp.data;

    if (!cityLocationData.length) {
      throw new notFoundError("No City Results");
    }
    return {
      latitude: cityLocationData[0].lat,
      longitude: cityLocationData[0].lon,
      country: cityLocationData[0].address.country,
    };
  } catch (err) {
    if (err instanceof notFoundError) {
      throw new notFoundError("No City Results");
    } else {
      throw new Error(err.message);
    }
  }
};
const getTimeOfCity = async (latitude, longitude) => {
  try {
    const timeResponse = await axios.get(
      `https:api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneApiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
    if (!timeResponse) throw new Error("Something went wrong");
    const rawCurrTimStringe = timeResponse.data.formatted;
    return rawCurrTimStringe;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getPrayersTimesFromApi = async (
  latitude,
  longitude,

  countryMethodCode
) => {
  try {
    const cityPrayersResp = await axios.get(
      `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${countryMethodCode}`
    );
    const cityPrayerData = cityPrayersResp.data;
    if (!cityPrayerData) throw new Error("Failed to fetch prayers data");
    const prayersTiming = cityPrayerData.data.timings;
    const prayerTimingArr = [
      { id: 1, prayerName: "Fajr", time: prayersTiming.Fajr },
      { id: 2, prayerName: "Dhuhr", time: prayersTiming.Dhuhr },
      { id: 3, prayerName: "Asr", time: prayersTiming.Asr },
      { id: 4, prayerName: "Maghrib", time: prayersTiming.Maghrib },
      { id: 5, prayerName: "Isha", time: prayersTiming.Isha },
    ];

    return prayerTimingArr;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getPrayersTimes = async (cityName) => {
  try {
    // await sleep(5000);
    const cityLocationData = await getCityLocationData(cityName);
    //Now based on the country name, we will find the nearest calculation method of that country (search about what calculation method of prayer apis is)
    const countryMethodCode =
      prayerCalculationMethodsByCountry[cityLocationData.country] ||
      prayerCalculationMethodsByCountry["default"];
    // await getTimeOfCity(cityLocationData.latitude, cityLocationData.longitude);

    const [searchedCityTimeString, prayersData] = await Promise.all([
      getTimeOfCity(cityLocationData.latitude, cityLocationData.longitude),
      getPrayersTimesFromApi(
        cityLocationData.latitude,
        cityLocationData.longitude,
        countryMethodCode
      ),
    ]);
    return { prayersData, searchedCityTimeString };
  } catch (err) {
    if (err instanceof notFoundError) {
      throw new notFoundError("Not found");
    } else {
      throw new Error("Something went wrong");
    }
  }
};
