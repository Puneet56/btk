import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem("theme");
if (!savedTheme || savedTheme === "dark") {
	document.documentElement.classList.add("dark");
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
