import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { UuidGenerator } from "./components/UuidGenerator";
import { MongoidTimestampCard } from "./features/mongoid-timestamp/MongoidTimestampCard";
import { QrGeneratorCard } from "./features/qr-generator/QrGeneratorCard";
import { UrlDecoderCard } from "./features/url-decoder/UrlDecoderCard";
import { UtcTimeCard } from "./features/utc-time/UtcTimeCard";

function App() {
	return (
		<div className="min-h-screen flex flex-col relative">
			<Header />
			<main className="flex-1 container p-4 mb-24">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<UtcTimeCard />
					<MongoidTimestampCard />
					<QrGeneratorCard />
					<UrlDecoderCard className="col-span-2" />
					<UuidGenerator />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
