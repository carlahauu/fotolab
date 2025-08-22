import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Photobooth from "./pages/Photobooth";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="appContent">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/photobooth" element={<Photobooth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;