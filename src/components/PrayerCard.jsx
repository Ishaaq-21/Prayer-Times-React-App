import "./prayerCard.css";
import maghribIcon from "../assets/prayersIcons/maghrib.svg";
export default function PrayerCard({ prayerName, prayerTime }) {
  return (
    <>
      <div className="prayer-card bg-black/30 backdrop-blur-lg border-2 rounded-3xl border-amber-400/30 py-10 px-12  w-11/12 relative overflow-hidden text-center ">
        <img src={maghribIcon} alt="Maghrib prayer icon" />

        <p className="prayer-name text-amber-500 text-3xl font-bold mb-5">
          maghrib
        </p>
        <div className="prayer-time text-white text-xl my-4 mx-0 text-5xl font-bold">
          12.35
        </div>
      </div>
    </>
  );
}
