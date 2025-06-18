import { useState } from "react";
import "./App.css";
import PrayerCard from "./components/PrayerCard";
import SearchCompo from "./components/SearchCompo";
import fajrIcon from "./assets/prayersIcons/Fajr.svg";
import duhrIcon from "./assets/prayersIcons/Duhr.svg";
import asrIcon from "./assets/prayersIcons/Asr.svg";
import maghIcon from "./assets/prayersIcons/maghrib.svg";
import ishaIcon from "./assets/prayersIcons/Aisha.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container mx-auto px-6 max-w-7xl h-full ">
        <SearchCompo></SearchCompo>
        <p className="text-white text-5xl font-bold text-center md:text-left shadow-text md:ml-3 mb-10 tracking-wide leading-relaxed">
          <span className="text-secondary-500">City :</span> Makkah
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
          <PrayerCard
            prayerName={"Fajr"}
            prayerTime={"03:50"}
            icon={fajrIcon}
          />
          <PrayerCard
            prayerName={"Duhr"}
            prayerTime={"12:45"}
            icon={duhrIcon}
          />
          <PrayerCard prayerName={"Asr"} prayerTime={"16:36"} icon={asrIcon} />
          <PrayerCard
            prayerName={"Magh"}
            prayerTime={"19:30"}
            icon={maghIcon}
          />
          <PrayerCard
            prayerName={"Aisha"}
            prayerTime={"21:10"}
            icon={ishaIcon}
          />
        </div>
      </div>
    </>
  );
}

export default App;
