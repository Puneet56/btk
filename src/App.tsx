import "./App.css";
import { Header } from "./components/Header";
import { MongoidTimestampCard } from "./features/mongoid-timestamp/MongoidTimestampCard";
import { QrGeneratorCard } from "./features/qr-generator/QrGeneratorCard";
import { UrlDecoderCard } from "./features/url-decoder/UrlDecoderCard";
import { UtcTimeCard } from "./features/utc-time/UtcTimeCard";

function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 container p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<UtcTimeCard />
					<MongoidTimestampCard />
					<QrGeneratorCard />
					<UrlDecoderCard className="col-span-2" />
				</div>
			</main>
		</div>
	);
}

export default App;
