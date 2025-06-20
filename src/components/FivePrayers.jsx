import { useContext } from "react";
import PrayerCard from "./SubComponents/PrayerCard";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";

export default function FivePrayers() {
  const prayerTimes = useContext(PrayersTimesContext);
  console.log(typeof prayerTimes);
  let PrayerCardsList = [];
  if (prayerTimes) {
    PrayerCardsList = prayerTimes.map((prayer) => {
      return (
        // I need to add a loader in the place of the time on loading
        <PrayerCard
          key={prayer.id}
          prayerName={prayer.prayerName}
          prayerTime={prayer.time}
        />
      );
    });
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
      {PrayerCardsList}
    </div>
  );
}
