import { useContext } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import moment from "moment";

export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const { prayersTimes, isLoading } = useContext(PrayersTimesContext);

  let currTime = moment().format("HH:mm:ss");
  console.log(currTime);
  //Now I get the next prayer
  let nextPrayer = prayersTimes.find((prayer) => {
    return moment(prayer.time, "HH:mm:ss").isAfter(
      moment(currTime, "HH:mm:ss")
    );
  });
  // let nextPrayerTime = nextPrayer.time;
  return (
    <div className="mt-7 mb-10 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 md:gap-y-5 ">
      <SearchCompo></SearchCompo>
      <p className="text-white text-4xl font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">City :</span>{" "}
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
          2:10:53
        </p>
      </div>
    </div>
  );
}
