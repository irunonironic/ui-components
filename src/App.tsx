import { Routes, Route, Link } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Button from "./pages/Button";
import Home from "./pages/Home";
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
      </Routes>
    </div>
  );
}
