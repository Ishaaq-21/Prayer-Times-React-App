import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

export function getNextPrayer(prayersTimes, currTime) {
  if (!prayersTimes.length) return null;

  let nextPrayer = prayersTimes.find((prayer) => {
    return dayjs(prayer.time, "HH:mm").isAfter(dayjs(currTime, "HH:mm:ss"));
  });

  return nextPrayer || prayersTimes[0];
}
export function getRemainingTimeToNextPrayer(
  prayersTimes,
  currTime,
  nextPrayerTime
) {
  if (!prayersTimes.length) return "00:00:00";
  if (!nextPrayerTime || currTime.isAfter(nextPrayerTime)) {
    nextPrayerTime = nextPrayerTime.add(1, "day");
  }

  const diff = nextPrayerTime.diff(currTime);
  const dur = dayjs.duration(Math.max(diff, 0));
  return `${String(Math.floor(dur.asHours())).padStart(2, "0")}:${String(dur.minutes()).padStart(2, "0")}:${String(dur.seconds()).padStart(2, "0")}`;
}

export function handleFinalRemainingTimesInterval(
  prayersTimes,
  nextPrayer,
  setNextPrayer,
  setRemainingTime
) {
  const currTime = dayjs();
  const currNextPrayer = getNextPrayer(prayersTimes, currTime);
  const currNextPrayerTime = dayjs(currNextPrayer.time, "HH:mm");
  if (!currNextPrayer || currTime.isAfter(nextPrayer.time, "HH:mm")) {
    setNextPrayer(currNextPrayer);
  }
  setRemainingTime(
    getRemainingTimeToNextPrayer(prayersTimes, currTime, currNextPrayerTime)
  );
}
