import { PrayersTimesContext } from "../../contexts/PrayersTimesProvider";
export default function NoResult({ message, t }) {
  return (
    <div className="w-full col-span-full max-w-4xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center justify-center p-8 shadow-lg min-h-[250px]">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold text-slate-100">
          {message === "No City Results"
            ? t(`noCityResultsTitle`)
            : t("unexpectedErrorTitle")}
        </h2>

        <p className="mt-2 text-slate-300 max-w-md">
          {message === "No City Results"
            ? t("noCityResultsMessage")
            : t("unexpectedErrorMessage")}
        </p>
      </div>
    </div>
  );
}
