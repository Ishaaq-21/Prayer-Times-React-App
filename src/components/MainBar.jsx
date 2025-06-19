import SearchCompo from "./SubComponents/SearchCompo";

export default function MainBar() {
  return (
    <div className="mt-8 mb-10 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 md:gap-y-5 ">
      <SearchCompo></SearchCompo>
      <p className="text-white text-4xl font-bold text-center  shadow-text   tracking-wide leading-relaxed -translate-y-1">
        <span className="text-secondary-500">City :</span> Makkah
      </p>
      <div className="md:col-span-2 lg:col-span-1">
        <p className="mb-1 text-4xl font-bold shadow-text text-secondary-500">
          Next Prayer
        </p>
        <p className="text-white text-center text-4xl font-bold shadow-text mr-2">
          2:10:53
        </p>
      </div>
    </div>
  );
}
