import { ThreeDot } from "react-loading-indicators";

export default function CityTime({
  isLoading,
  error,
  cityCurrTime,
  t,
  activeLang,
}) {
  return (
    <div
      dir={activeLang === "en" ? "ltr" : "rtl"}
      className={`${activeLang == "ar" ? "sm:order-3 md:order-3 city-time" : "lg:order-2"}  text-white text-3xl font-bold text-center  shadow-text -mt-2 sm:mt-0  `}
    >
      <p className="mb-1  font-bold shadow-text text-secondary-500 inline-block tracking-wide leading-relaxed mr-3">
        {t("time")}
      </p>
      <p className="text-white text-center font-bold shadow-text inline">
        {error ? (
          "00:00:00"
        ) : isLoading ? (
          <ThreeDot color={["#ac8424", "#d3a330", "#dcb65a", "#e5c984"]} />
        ) : (
          (activeLang === "ar" ? " " : "") + cityCurrTime
        )}
      </p>
    </div>
  );
}
