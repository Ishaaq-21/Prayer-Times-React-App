import { useContext } from "react";
import PrayerCard from "./SubComponents/PrayerCard";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";
import NoResult from "./SubComponents/NoResult";

export default function FivePrayers() {
  const { error, prayersTimes } = useContext(PrayersTimesContext);

  let PrayerCardsList = [];
  console.log(error, prayersTimes);
  if (prayersTimes) {
    PrayerCardsList = prayersTimes.map((prayer) => {
      return (
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
      {error && <NoResult message={error} />}
      {!error && PrayerCardsList}
    </div>
  );
}
