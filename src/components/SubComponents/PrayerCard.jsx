import "./prayerCard.css";
import FajrIcon from "../../assets/prayersIcons/Fajr.svg";
import DhuhrIcon from "../../assets/prayersIcons/Dhuhr.svg";
import AsrIcon from "../../assets/prayersIcons/Asr.svg";
import MaghribIcon from "../../assets/prayersIcons/maghrib.svg";
import IshaIcon from "../../assets/prayersIcons/Aisha.svg";

export default function PrayerCard({ prayerName, prayerTime, t }) {
  const mapIcons = {
    Fajr: FajrIcon,
    Dhuhr: DhuhrIcon,
    Asr: AsrIcon,
    Maghrib: MaghribIcon,
    Isha: IshaIcon,
  };

  return (
    <>
      <div className="prayer-card bg-black/30 backdrop-blur-lg border-2 rounded-3xl border-amber-400/30 w-11/12 relative overflow-hidden text-center py-2 px-5">
        <img
          className="max-w-24 mx-auto"
          src={mapIcons[prayerName]}
          alt="Maghrib prayer icon"
        />

        <p className="prayer-name text-amber-500 text-xl sm:text-4xl font-bold mb-5 mx-auto w-fit shadow-text">
          {t(`${prayerName}`)}
        </p>
        <div className="prayer-time text-white text-lg sm:text-4xl my-4 mx-0 text-5xl font-bold">
          {prayerTime}
        </div>
      </div>
    </>
  );
}
