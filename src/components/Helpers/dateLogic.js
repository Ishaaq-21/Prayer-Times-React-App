import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

/**
 * This function returns the next upcoming prayer time based on the current time.
 * It uses `find` to return the first prayer that occurs after `currTime`.
 * If no prayer is found (i.e., it's after the last prayer of the day), it returns Fajr (index 0).
 */
export function getNextPrayer(prayersTimes, currTime) {
  if (!prayersTimes.length) return null;

  let nextPrayer = prayersTimes.find((prayer) => {
    return dayjs(prayer.time, "HH:mm").isAfter(dayjs(currTime, "HH:mm:ss"));
  });
  return nextPrayer || prayersTimes[0];
}

/**
 * This function calculates the remaining time until the next prayer.
 *
 * - If the current time is after the next prayer time (i.e., it's Fajr of the next day),
 *   we add one day to the `nextPrayerTime`.
 * - It then computes the difference between the next prayer and the current time.
 * - The result is formatted into a string in the format HH:mm:ss.
 */
export function getRemainingTimeToNextPrayer(
  prayersTimes,
  currTime,
  nextPrayerTime
) {
  if (!prayersTimes.length) return "00:00:00";

  // If the current time is after the next prayer time, we assume it's the Fajr of the next day

  if (!nextPrayerTime || currTime.isAfter(nextPrayerTime)) {
    nextPrayerTime = nextPrayerTime.add(1, "day");
  }

  // here we calculate the difference between NPT and the current time in miliseconds.
  const diff = nextPrayerTime.diff(currTime);

  //Now we convert those milisecs to readable duration (HH:mm:ss), if the milisecs are negative the duration is 0
  const dur = dayjs.duration(Math.max(diff, 0));
  //return the duration as a string ex: 01:15:28
  return `${String(Math.floor(dur.asHours())).padStart(2, "0")}:${String(dur.minutes()).padStart(2, "0")}:${String(dur.seconds()).padStart(2, "0")}`;
}

/**
 * This function updates the current `nextPrayer` and remaining time state at regular intervals.
 *
 * - It gets the current time using `dayjs()`.
 * - It determines the next prayer by comparing `currTime` to today's prayers.
 * - If the stored `nextPrayer` has passed (i.e., its time is earlier than `currTime`),
 *   we update the state with a new next prayer.
 * - Then we calculate and update the remaining time until the new `nextPrayer`.
 *
 * Note:
 * - `currNextPrayer` is evaluated every second.
 * - `nextPrayer` state only updates when a new prayer cycle begins.
 */
export function handleFinalRemainingTimesInterval(
  prayersTimes,
  nextPrayer,
  setNextPrayer,
  setRemainingTime
) {
  const currTime = dayjs();
  const currNextPrayer = getNextPrayer(prayersTimes, currTime);
  let currNextPrayerTime = null;
  if (currNextPrayer) currNextPrayerTime = dayjs(currNextPrayer.time, "HH:mm");

  if (!nextPrayer || currTime.isAfter(nextPrayer.time, "HH:mm")) {
    setNextPrayer(currNextPrayer);
  }
  setRemainingTime(
    getRemainingTimeToNextPrayer(prayersTimes, currTime, currNextPrayerTime)
  );
}
