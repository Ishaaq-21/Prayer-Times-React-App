import { useContext, useEffect, useState } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import NextPrayer from "./SubComponents/NextPrayerCompo";

//Main compo
export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const { prayersTimes, isLoading } = useContext(PrayersTimesContext);

  //the problem is that the functions are making difference between my current time and the prayertime of that city and this is incorrect, cuz when we try to find the next prayer in the find function, it returns the prayer that is near to my current time not the prayer that is near to the city current time and we need to handle this

  return (
    <div className="my-8 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-3 gap-y-5">
      <SearchCompo></SearchCompo>
      <p className="text-white text-3xl  font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">City : </span>{" "}
        {isLoading
          ? "..."
          : prayersTimes.length > 0
            ? lastCityName.current
            : "Unknown"}
      </p>
      <div className=" text-white text-3xl font-bold text-center  shadow-text -mt-2 sm:mt-0  ">
        <p className="mb-1  font-bold shadow-text text-secondary-500 inline-block tracking-wide leading-relaxed mr-3">
          Time :
        </p>
        <p className="text-white text-center font-bold shadow-text inline">
          15:20:30
        </p>
      </div>
      <NextPrayer prayersTimes={prayersTimes} isLoading={isLoading} />
    </div>
  );
}
