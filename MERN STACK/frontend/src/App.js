import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/home";
import Navbar from "./components/navBar";

function App() {
  return (
    <div className="App">
      {/* surrounds everything needed for the routing system */}
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
