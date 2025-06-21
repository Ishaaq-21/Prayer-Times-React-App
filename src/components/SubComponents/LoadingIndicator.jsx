import crescentIcon from "../../assets/crescentIcon.svg";

const LoadeingIndicator = () => {
  return (
    <div className="w-full col-span-full max-w-4xl  bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex items-center justify-center p-8 shadow-lg">
      <div className="text-center flex flex-col items-center">
        <div className="mb-6 text-amber-300 animate-calm-pulse">
          <img
            className="w-24 fill-amber-300"
            src={crescentIcon}
            alt="crescent Icon"
          />
        </div>

        <h2 className="text-2xl font-semibold text-slate-200 tracking-wide">
          Loading Prayer Times...
        </h2>

        <p className="mt-2 text-slate-400 max-w-sm">Please wait a moment.</p>
      </div>
    </div>
  );
};
export default LoadeingIndicator;
