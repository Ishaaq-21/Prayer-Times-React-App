import { useContext, useEffect, useState } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import {
  handleFinalRemainingTimesInterval,
  getNextPrayer,
} from "./Helpers/dateLogic";
//Main compo
export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const { prayersTimes, isLoading } = useContext(PrayersTimesContext);
  const [remainingTime, setRemainingTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);

  console.log(nextPrayer);
  //the problem is that the functions are making difference between my current time and the time of that city and this is correct, cuz when we try to find the next prayer in the find function, it returns the prayer that is near to my current time not the prayer that is near to the city current time and we need to handle this
  useEffect(() => {
    const currTime = dayjs();
    setNextPrayer(getNextPrayer(prayersTimes, currTime));
    setRemainingTime("00:00:00");
    const intervalId = setInterval(() => {
      handleFinalRemainingTimesInterval(
        prayersTimes,
        nextPrayer,
        setNextPrayer,
        setRemainingTime
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [prayersTimes, nextPrayer]);

  return (
    <div className="mt-7 mb-10 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 md:gap-y-5 ">
      <SearchCompo></SearchCompo>
      <p className="text-white text-4xl font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">City : </span>{" "}
        {isLoading
          ? "..."
          : prayersTimes.length > 0
            ? lastCityName.current
            : "Unknown"}
      </p>
      <div className="sm:col-span-2 lg:col-span-1">
        <p className="mb-1 text-4xl font-bold shadow-text text-secondary-500">
          {nextPrayer && nextPrayer.prayerName} in :
        </p>
        <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
          {remainingTime}
        </p>
      </div>
    </div>
  );
}
