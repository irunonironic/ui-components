import { Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Button from "./pages/Button";
import Home from "./pages/Home";
import Checkbox from './pages/CheckboxUi'
import StarRating from "./components/Rating";
import Card from "./components/Card";
<Home />
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* GLOBAL UI */}
      <header className="p-4 flex justify-between items-center">
        <Link to="/" className="text-sm opacity-70">
          Home
        </Link>
        <ThemeToggle />
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/button" element={<Button />} />
        <Route path="checkbox" element={<Checkbox />} />
         <Route path="rating" element={<StarRating />} />
         <Route path="card" element={<Card />} />
      </Routes>
    </div>
  );
}
