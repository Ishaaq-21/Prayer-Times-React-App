import { useContext } from "react";
import PrayerCard from "./SubComponents/PrayerCard";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";
import NoResult from "./SubComponents/NoResult";
import LoadeingIndicator from "./SubComponents/LoadingIndicator";

export default function FivePrayers() {
  const { error, prayersTimes, isLoading, t } = useContext(PrayersTimesContext);

  let PrayerCardsList = [];
  if (prayersTimes) {
    PrayerCardsList = prayersTimes.map((prayer, index) => {
      return (
        <PrayerCard
          key={prayer.id}
          className={index === 4 ? "col-span-full sm:col-span-1" : ""}
          prayerName={prayer.prayerName}
          prayerTime={prayer.time}
          t={t}
        />
      );
    });
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
      {isLoading && <LoadeingIndicator t={t} />}
      {error && <NoResult message={error} t={t} />}
      {!error && !isLoading && PrayerCardsList}
    </div>
  );
}
