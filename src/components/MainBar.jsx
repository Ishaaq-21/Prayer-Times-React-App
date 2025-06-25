import { useContext, useEffect, useRef, useState } from "react";
import SearchCompo from "./SubComponents/SearchCompo";
import {
  MainBarInfoConext,
  PrayersTimesContext,
} from "../contexts/PrayersTimesProvider";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  getNextPrayer,
  handleFinalRemainingTimesInterval,
} from "./Helpers/dateLogic";
import { ThreeDot } from "react-loading-indicators";
dayjs.extend(duration);
dayjs.extend(customParseFormat);

/*Start Compoenent */
//Main compo
export default function MainBar() {
  const { lastCityName } = useContext(MainBarInfoConext);
  const {
    prayersTimes,
    isLoading,
    error,
    cityTimeString: initialCityTimeString,
  } = useContext(PrayersTimesContext);

  const [cityCurrTime, setCityCurrTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState(null);

  const nextPrayerRef = useRef(null);
  // console.log(
  //   "From every Render ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> nextPrayer name "
  // );
  // if (nextPrayer) console.log(nextPrayer.prayerName);
  // console.log(
  //   "From every Render ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> nextPrayerRef name "
  // );

  function resetRemainingTimeAfterSearchClick() {
    console.log(
      "This is now will be excuted *****/*/*/*/*/*/*/*/*/*/*/*/*//*/*/*/*//"
    );
    setRemainingTime("00:00:00");
    setNextPrayer(null);
  }
  useEffect(() => {
    nextPrayerRef.current = nextPrayer;
  }, [nextPrayer]);
  useEffect(() => {
    setCityCurrTime(
      initialCityTimeString
        ? dayjs(initialCityTimeString, "YYYY-MM-DD HH:mm:ss")
            .add(1, "second")
            .format("HH:mm:ss")
        : null
    );

    const intervalId = setInterval(() => {
      setCityCurrTime((prevTime) => {
        const newTime = prevTime
          ? dayjs(prevTime, "HH:mm:ss").add(1, "second").format("HH:mm:ss")
          : dayjs().format("HH:mm:ss");

        setRemainingTime(() => {
          return handleFinalRemainingTimesInterval(
            prayersTimes,
            nextPrayerRef.current,
            setNextPrayer,
            newTime
          );
        });
        return newTime;
      });
      //the remaining time is not updating
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [initialCityTimeString, prayersTimes]);

  return (
    <div className="my-8 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-3 gap-y-5">
      <SearchCompo
        resetCityTimeOnSearchClick={resetRemainingTimeAfterSearchClick}
      ></SearchCompo>
      <p className="text-white text-3xl  font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">City : </span>{" "}
        {isLoading ? (
          <ThreeDot color={["#ac8424", "#d3a330", "#dcb65a", "#e5c984"]} />
        ) : prayersTimes && prayersTimes.length > 0 ? (
          lastCityName.current
        ) : (
          "Unknown"
        )}
      </p>
      <div className=" text-white text-3xl font-bold text-center  shadow-text -mt-2 sm:mt-0  ">
        <p className="mb-1  font-bold shadow-text text-secondary-500 inline-block tracking-wide leading-relaxed mr-3">
          Time :
        </p>
        <p className="text-white text-center font-bold shadow-text inline">
          {isLoading || error ? "00:00:00" : cityCurrTime}
        </p>
      </div>{" "}
      <div className="md:col-span-1 lg:col-span-full lg:-mt-2 text-center text-3xl ">
        <p className=" text-white mb-1  font-bold shadow-text tracking-wide leading-relaxed ">
          <span className="text-accent-500  ">
            {(nextPrayer && nextPrayer.prayerName) || "Next Prayer"} in :{" "}
          </span>
          {isLoading || !remainingTime || error ? "00:00:00" : remainingTime}
        </p>
      </div>
    </div>
  );
}
