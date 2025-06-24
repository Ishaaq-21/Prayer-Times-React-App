import { useContext, useEffect, useRef, useState } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

export default function CityTime() {
  const [cityCurrTime, setCityCurrTime] = useState(null);
  const {
    cityTimeString: initialCityTimeString,
    error,
    isLoading,
  } = useContext(PrayersTimesContext);

  //useEffect
  //***** */
  useEffect(() => {
    setCityCurrTime(
      dayjs(initialCityTimeString, "YYYY-MM-DD HH:mm:ss")
        .add(1, "second")
        .format("HH:mm:ss")
    );
    const intervalId = setInterval(() => {
      setCityCurrTime((prevTime) => {
        return dayjs(prevTime, "HH:mm:ss").add(1, "second").format("HH:mm:ss");
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [initialCityTimeString]);
  return (
    <div className=" text-white text-3xl font-bold text-center  shadow-text -mt-2 sm:mt-0  ">
      <p className="mb-1  font-bold shadow-text text-secondary-500 inline-block tracking-wide leading-relaxed mr-3">
        Time :
      </p>
      <p className="text-white text-center font-bold shadow-text inline">
        {error || isLoading
          ? "00:00:00"
          : cityCurrTime
            ? cityCurrTime
            : "00:00:00"}
      </p>
    </div>
  );
}
