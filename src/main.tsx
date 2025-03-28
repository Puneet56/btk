import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";
import "./index.css";

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem("theme");
if (!savedTheme || savedTheme === "dark") {
	document.documentElement.classList.add("dark");
}

const queryClient = new QueryClient();

const options = {
	api_host: import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST,
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PostHogProvider
			apiKey={import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY}
			options={options}
		>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</BrowserRouter>
		</PostHogProvider>
	</StrictMode>,
);
