import { useState } from "react";
import "./App.css";
import PrayerCard from "./components/PrayerCard";

function App() {
  const [count, setCount] = useState(0);

  return <PrayerCard></PrayerCard>;
}

export default App;
