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
      <div className="container mx-auto my-8 px-6 max-w-7xl h-full ">
        <h1 className="text-center mb-5 text-5xl text-gray-300  font-bold">
          Muslim Prayer Times
        </h1>
        <blockquote className="text-center text-white text-lg ">
          <i>
            “Which deed is dearest to Allah? To offer prayers at their early
            stated fixed times.”
            <footer className="font-bold">— Ṣaḥīḥ al‑Bukhārī 527</footer>
          </i>
        </blockquote>

        <div className="mt-8 mb-10 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 md:gap-y-5 ">
          <SearchCompo></SearchCompo>
          <p className="text-white text-4xl font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
            <span className="text-secondary-500">City :</span> Makkah
          </p>
          <div className="md:col-span-2 lg:col-span-1">
            <p className="mb-1 text-4xl font-bold shadow-text text-secondary-500">
              Next Prayer
            </p>
            <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
              2:10:53
            </p>
          </div>
        </div>
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
