import { useContext } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";

export default function NoResult({ message, details }) {
  return (
    <div class="w-full col-span-full max-w-4xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center justify-center p-8  shadow-lg">
      <div class="text-center flex flex-col items-center">
        <div class="mb-6 text-secondary-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-20 h-20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm-1.14 16.93c-2.79-1.2-4.85-3.9-5.18-7.03.11-.01.22-.02.33-.02 2.21 0 4 1.79 4 4 0 .34-.04.68-.11.99l.2.03zm5.3-1.1c-.34.34-.78.57-1.25.67.13-.33.2-.68.2-1.04 0-1.65-1.35-3-3-3-.45 0-.88.1-1.27.28.09-.27.16-.55.16-.85 0-1.28-1.04-2.31-2.32-2.31-1.12 0-2.07.8-2.28 1.85C5.02 9.42 5 9.21 5 9c0-3.86 3.14-7 7-7s7 3.14 7 7c0 1.22-.31 2.37-.87 3.39z" />
          </svg>
        </div>

        <h2 class="text-3xl font-bold text-slate-100">{message}</h2>

        <p class="mt-2 text-slate-300 max-w-sm">
          {!details &&
            "We couldn't find a city matching your search. Please check the spelling or try a different name."}
        </p>
      </div>
    </div>
  );
}
