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
    <div className="md:col-span-1 lg:col-span-full lg:-mt-2 text-center text-3xl ">
      <p className=" text-white mb-1  font-bold shadow-text tracking-wide leading-relaxed ">
        <span className="text-accent-500  ">
          {(nextPrayer && nextPrayer.prayerName) || "Next Prayer"} in :{" "}
        </span>
        {isLoading ? "00:00:00" : remainingTime}
      </p>
    </div>
  );
}
