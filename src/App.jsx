import { useState } from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import PrayersDataProvider from "./contexts/PrayersTimesProvider";

//I need to test the app behavior offline before publishing
function App() {
  return (
    <PrayersDataProvider>
      <AppContainer />
    </PrayersDataProvider>
  );
}

export default App;
