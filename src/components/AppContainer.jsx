import FivePrayers from "./FivePrayers";
import Header from "./Header";
import MainBar from "./MainBar";

export default function AppContainer() {
  return (
    <div className="container  mx-auto my-7 md:my-auto px-6 max-w-7xl h-full  relative">
      <Header />
      <MainBar />
      <FivePrayers />
    </div>
  );
}
