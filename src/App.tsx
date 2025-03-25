import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToBottom } from "./components/ScrollToBottom";
import { HomePage } from "./pages/HomePage";
import { JsonPrettifierPage } from "./pages/JsonPrettifierPage";
import { UrlDecoderPage } from "./pages/UrlDecoderPage";

function App() {
	return (
		<div className="">
			<Header />
			<main className="p-8 mb-24">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/json-prettifier" element={<JsonPrettifierPage />} />
					<Route path="/url-decoder" element={<UrlDecoderPage />} />
				</Routes>
			</main>
			<Footer />
			<ScrollToBottom />
		</div>
	);
}

export default App;
