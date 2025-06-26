import { ThreeDot } from "react-loading-indicators";

export default function NextPrayerTime({
  nextPrayer,
  gettingTime,
  isLoading,
  error,
  remainingTime,
  t,
}) {
  return (
    <div className="md:col-span-1 lg:col-span-full lg:-mt-2 text-center text-3xl ">
      <p className="text-white mb-1 font-bold shadow-text tracking-wide leading-relaxed">
        <span className="text-accent-500">
          {nextPrayer ? t(`${nextPrayer.prayerName}`) : t("nextPrayer")}{" "}
          {t("nextPrayerIn")}
        </span>{" "}
        {(gettingTime || isLoading) && (
          <ThreeDot color={["#ac8424", "#d3a330", "#dcb65a", "#e5c984"]} />
        )}
        {!gettingTime && !isLoading && !error && remainingTime && (
          <span className="ml-2">{remainingTime}</span>
        )}
        {error && <span className="ml-2">00:00:00</span>}
      </p>
    </div>
  );
}
