import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="appContent">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default App;