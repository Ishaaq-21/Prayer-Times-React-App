import { useContext, useEffect, useState } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import moment from "moment";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
function timeStringToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function secondsToHHMMSS(seconds) {
  const dur = dayjs.duration(seconds, "seconds");

  const hours = String(Math.floor(dur.asHours())).padStart(2, "0");
  const minutes = String(dur.minutes()).padStart(2, "0");
  const secs = String(dur.seconds()).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
}
function getRemainingTimeToNextPrayer(prayersTimes) {
  if (prayersTimes.length) {
    let currTime = moment().format("HH:mm:ss");

    //Now I will get the next prayer
    let nextPrayer = prayersTimes.find((prayer) => {
      return moment(prayer.time, "HH:mm:ss").isAfter(
        moment(currTime, "HH:mm:ss")
      );
    });
    const nextPrayerTime = moment(nextPrayer.time, "HH:mm").format("HH:mm:ss");
    let currentTimeSec = timeStringToSeconds(currTime);
    let nextPrayerTimeSec = timeStringToSeconds(nextPrayerTime);
    let diffSec = nextPrayerTimeSec - currentTimeSec;

    let remainginTimeToNextPrayer = secondsToHHMMSS(diffSec);
    return remainginTimeToNextPrayer;
  }
}

//Main compo
export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const { prayersTimes, isLoading } = useContext(PrayersTimesContext);
  const [remainingTime, setRemainingTime] = useState("");

  console.log(prayersTimes.length);
  useEffect(() => {
    setRemainingTime("Start getting the time ");
    const intervalId = setInterval(() => {
      const time = getRemainingTimeToNextPrayer(prayersTimes);
      setRemainingTime(time);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [prayersTimes]);

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
          Next Prayer in :
        </p>
        <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
          {remainingTime}
        </p>
      </div>
    </div>
  );
}
