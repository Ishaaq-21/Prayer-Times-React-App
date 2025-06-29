import { useState } from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import PrayersDataProvider from "./contexts/PrayersTimesProvider";
import ChatBotApp from "./components/AI-ChatBotCompo/ChatBot";

//I need to test the app behavior offline before publishing
function App() {
  return (
    <PrayersDataProvider>
      <AppContainer />
      <ChatBotApp />
    </PrayersDataProvider>
  );
}

export default App;
