import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImportantLinks from "./components/ImportantLinks";
import PlacementHistory from "./components/PlacementHistory";
import HRDirectory from "./components/HRDirectory";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <ImportantLinks />
        <PlacementHistory />
        <HRDirectory />
      </main>

      <Footer />
    </div>
  );
}

export default App;