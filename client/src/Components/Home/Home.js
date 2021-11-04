import "./Home.css";
import Header from "./Header/Header";
import Info from "./Info/Info";
import Instructions from "./Instructions/Instructions";
import About from "./About/About";

function Home() {
  return (
    <div className="text-2xl">
      <Header />
      <Info />
      <Instructions />
      <About />
    </div>
  );
}

export default Home;
