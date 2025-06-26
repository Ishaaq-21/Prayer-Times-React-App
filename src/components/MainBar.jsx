import { useContext, useEffect, useRef, useState } from "react";
import SearchCompo from "./SubComponents/mainBarSubComponents/SearchCompo";
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
import CityTime from "./SubComponents/mainBarSubComponents/CityTime";
import NextPrayerTime from "./SubComponents/mainBarSubComponents/NextPrayerTime";
import { useTranslation } from "react-i18next";
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
  const [gettingTime, setGettingTime] = useState(null);
  const { t, i18n } = useTranslation();
  const nextPrayerRef = useRef(null);
  const intervalId = useRef(0);
  function resetNextPrayer() {
    setNextPrayer(null);
    clearInterval(intervalId.current);
  }
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    nextPrayerRef.current = nextPrayer;
  }, [nextPrayer]);
  useEffect(() => {
    setGettingTime(true);
    setCityCurrTime(
      initialCityTimeString
        ? dayjs(initialCityTimeString, "YYYY-MM-DD HH:mm:ss")
            .add(1, "second")
            .format("HH:mm:ss")
        : null
    );

    intervalId.current = setInterval(() => {
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
        setGettingTime(false);
        return newTime;
      });
      //the remaining time is not updating
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [initialCityTimeString, prayersTimes]);

  return (
    <div className="my-8 px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-3 gap-y-5">
      <SearchCompo resetNextPrayer={resetNextPrayer} t={t}></SearchCompo>
      <p className="text-white text-3xl  font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">{t("city")} </span>{" "}
        {isLoading ? (
          <ThreeDot color={["#ac8424", "#d3a330", "#dcb65a", "#e5c984"]} />
        ) : !error ? (
          lastCityName.current
        ) : (
          "Unknown"
        )}
      </p>
      <CityTime
        isLoading={isLoading}
        error={error}
        cityCurrTime={cityCurrTime}
        t={t}
      />
      <NextPrayerTime
        nextPrayer={nextPrayer}
        gettingTime={gettingTime}
        isLoading={isLoading}
        error={error}
        remainingTime={remainingTime}
        t={t}
      />
    </div>
  );
}
