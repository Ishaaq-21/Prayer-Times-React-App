import { useContext, useEffect, useState } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

function getNextPrayer(prayersTimes, currTime) {
  if (!prayersTimes.length) return null;

  let nextPrayer = prayersTimes.find((prayer) => {
    return dayjs(prayer.time, "HH:mm").isAfter(dayjs(currTime, "HH:mm:ss"));
  });

  return nextPrayer || prayersTimes[0];
}
function getRemainingTimeToNextPrayer(prayersTimes, currTime, nextPrayerTime) {
  if (!prayersTimes.length) return "00:00:00";
  if (!nextPrayerTime || currTime.isAfter(nextPrayerTime)) {
    nextPrayerTime = nextPrayerTime.add(1, "day");
  }

  const diff = nextPrayerTime.diff(currTime);
  const dur = dayjs.duration(Math.max(diff, 0));
  return `${String(Math.floor(dur.asHours())).padStart(2, "0")}:${String(dur.minutes()).padStart(2, "0")}:${String(dur.seconds()).padStart(2, "0")}`;
}

//Main compo
export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const { prayersTimes, isLoading } = useContext(PrayersTimesContext);
  const [remainingTime, setRemainingTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);

  useEffect(() => {
    const currTime = dayjs();
    setNextPrayer(getNextPrayer(prayersTimes, currTime));

    const intervalId = setInterval(() => {
      const currTime = dayjs();
      const currNextPrayer = getNextPrayer(prayersTimes, currTime);
      const currNextPrayerTime = dayjs(currNextPrayer.time, "HH:mm");
      if (!currNextPrayer || currTime.isAfter(nextPrayer.time, "HH:mm")) {
        setNextPrayer(currNextPrayer);
      }
      console.log("CuurNext prayer -> " + currNextPrayer.time);
      setRemainingTime(
        getRemainingTimeToNextPrayer(prayersTimes, currTime, currNextPrayerTime)
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
          Next Prayer in :
        </p>
        <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
          {remainingTime}
        </p>
      </div>
    </div>
  );
}
