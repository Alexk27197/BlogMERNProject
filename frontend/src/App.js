import { Home, About, Contact } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" index element={<About />} />
        <Route path="/contact" index element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
