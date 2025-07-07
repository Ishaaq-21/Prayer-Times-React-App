import { useContext } from "react";
import PrayerCard from "./SubComponents/PrayerCard";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";
import NoResult from "./SubComponents/NoResult";
import LoadeingIndicator from "./SubComponents/LoadingIndicator";

export default function FivePrayers() {
  const { error, prayersTimes, isLoading, t, activeLang } =
    useContext(PrayersTimesContext);

  let PrayerCardsList = [];
  if (prayersTimes) {
    PrayerCardsList = prayersTimes.map((prayer) => {
      return (
        <PrayerCard
          key={prayer.id}
          prayerName={prayer.prayerName}
          prayerTime={prayer.time}
          t={t}
        />
      );
    });
  }
  return (
    <div
      className={`flex pb-10 flex-wrap justify-center gap-4 ${activeLang === "ar" ? "flex-row-reverse font-tajawal" : "font-inter"}`}
    >
      {isLoading && <LoadeingIndicator t={t} />}
      {error && <NoResult message={error} t={t} />}
      {!error && !isLoading && PrayerCardsList}
    </div>
  );
}
