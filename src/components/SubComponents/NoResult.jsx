import { useContext } from "react";
import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
export default function NoResult({ message, t }) {
  return (
    <div className="w-full col-span-full max-w-4xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center justify-center p-8 shadow-lg min-h-[250px]">
      <div className="text-center flex flex-col items-center">
        <div className="mb-6 text-secondary-500"></div>

        <h2 className="text-3xl font-bold text-slate-100">{message}</h2>

        <p className="mt-2 text-slate-300 max-w-md">
          {message === "No City Results"
            ? "We couldn't find a city matching your search. Please check the spelling or try a different name."
            : "An unexpected error occurred while retrieving the data. Please check your internet connection or try again shortly."}
        </p>
      </div>
    </div>
  );
}
