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
    PrayerCardsList = prayersTimes.map((prayer, index) => {
      return (
        <PrayerCard
          key={prayer.id}
          className={
            prayer.prayerName === "Fajr"
              ? "order-4"
              : prayer.prayerName === "Isha"
                ? "order-0"
                : ""
          }
          prayerName={prayer.prayerName}
          prayerTime={prayer.time}
          t={t}
        />
      );
    });
  }
  return (
    <div
      className={`flex pb-10  flex-wrap justify-center gap-4 ${activeLang === "ar" ? "flex-row-reverse" : ""}`}
    >
      {isLoading && <LoadeingIndicator t={t} />}
      {error && <NoResult message={error} t={t} />}
      {!error && !isLoading && PrayerCardsList}
    </div>
  );
}
