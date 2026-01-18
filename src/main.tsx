import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
    <App />
  </HashRouter>
);
