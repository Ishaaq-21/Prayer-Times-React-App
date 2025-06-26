import { ThreeDot } from "react-loading-indicators";

export default function CityTime({ isLoading, error, cityCurrTime }) {
  return (
    <div className=" text-white text-3xl font-bold text-center  shadow-text -mt-2 sm:mt-0  ">
      <p className="mb-1  font-bold shadow-text text-secondary-500 inline-block tracking-wide leading-relaxed mr-3">
        Time :
      </p>
      <p className="text-white text-center font-bold shadow-text inline">
        {error ? (
          "00:00:00"
        ) : isLoading ? (
          <ThreeDot color={["#ac8424", "#d3a330", "#dcb65a", "#e5c984"]} />
        ) : (
          cityCurrTime
        )}
      </p>
    </div>
  );
}
