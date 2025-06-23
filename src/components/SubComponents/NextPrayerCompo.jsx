import { useState, useEffect } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
import {
  handleFinalRemainingTimesInterval,
  getNextPrayer,
} from "../Helpers/dateLogic";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
export default function NextPrayer({ prayersTimes, isLoading }) {
  const [remainingTime, setRemainingTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);

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
    <div className="sm:col-span-2 lg:col-span-1">
      <p className="mb-1 text-4xl font-bold shadow-text text-secondary-500">
        {nextPrayer && nextPrayer.prayerName} in :
      </p>
      <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
        {isLoading ? "00:00:00" : remainingTime}
      </p>
    </div>
  );
}
