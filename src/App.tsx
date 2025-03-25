import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToBottom } from "./components/ScrollToBottom";
import { IpDisplayCard } from "./features/ip-display/IpDisplayCard";
import { IpInfoCard } from "./features/ip-info/IpInfoCard";
import { MongoidTimestampCard } from "./features/mongoid-timestamp/MongoidTimestampCard";
import { QrGeneratorCard } from "./features/qr-generator/QrGeneratorCard";
import { UrlDecoderCard } from "./features/url-decoder/UrlDecoderCard";
import { UtcTimeCard } from "./features/utc-time/UtcTimeCard";
import { UuidGenerator } from "./features/uuid-generator/UuidGenerator";

function App() {
	return (
		<div className="">
			<Header />
			<main className="p-8 mb-24">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
					<MongoidTimestampCard />
					<UuidGenerator />
					<UtcTimeCard />
					<UrlDecoderCard className="col-span-2" />
					<QrGeneratorCard />
					<IpInfoCard className="row-span-2" />
					<IpDisplayCard />
				</div>
			</main>
			<Footer />
			<ScrollToBottom />
		</div>
	);
}

export default App;
