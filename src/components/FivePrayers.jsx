import { useContext } from "react";
import PrayerCard from "./SubComponents/PrayerCard";
import { PrayersTimesContext } from "../contexts/PrayersTimesProvider";
import NoResult from "./SubComponents/NoResult";

export default function FivePrayers() {
  const { error, noCityResult, prayersTimes } = useContext(PrayersTimesContext);

  let PrayerCardsList = [];
  console.log(error, noCityResult, prayersTimes);
  if (prayersTimes) {
    PrayerCardsList = prayersTimes.map((prayer) => {
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
      {/* {error && error.message === "No City Found" && (
        <NoResult message="No Result Found" />
      )} */}
      {error && error.message !== "No City Found" && (
        <NoResult message="Oops!" details={error.details} />
      )}
      {!noCityResult && !error && PrayerCardsList}
    </div>
  );
}
