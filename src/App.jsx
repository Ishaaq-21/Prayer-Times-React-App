import { useState } from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import PrayersDataProvider from "./contexts/PrayersDataProvider";
function App() {
  return (
    <PrayersDataProvider>
      <AppContainer />
    </PrayersDataProvider>
  );
}

export default App;
