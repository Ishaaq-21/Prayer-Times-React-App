import PrayerCard from "./SubComponents/PrayerCard";
import fajrIcon from "../assets/prayersIcons/Fajr.svg";
import duhrIcon from "../assets/prayersIcons/Duhr.svg";
import asrIcon from "../assets/prayersIcons/Asr.svg";
import maghIcon from "../assets/prayersIcons/maghrib.svg";
import ishaIcon from "../assets/prayersIcons/Aisha.svg";

export default function FivePrayers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
      <PrayerCard prayerName={"Fajr"} prayerTime={"03:50"} icon={fajrIcon} />
      <PrayerCard prayerName={"Duhr"} prayerTime={"12:45"} icon={duhrIcon} />
      <PrayerCard prayerName={"Asr"} prayerTime={"16:36"} icon={asrIcon} />
      <PrayerCard prayerName={"Magh"} prayerTime={"19:30"} icon={maghIcon} />
      <PrayerCard prayerName={"Aisha"} prayerTime={"21:10"} icon={ishaIcon} />
    </div>
  );
}
