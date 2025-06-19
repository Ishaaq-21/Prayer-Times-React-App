import FivePrayers from "./FivePrayers";
import Header from "./Header";
import MainBar from "./MainBar";

export default function AppContainer() {
  return (
    <div className="container mx-auto my-10 px-6 max-w-7xl h-full ">
      <Header />
      <MainBar />
      <FivePrayers />
    </div>
  );
}
