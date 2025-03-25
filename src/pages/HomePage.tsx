import { IpDisplayCard } from "@/features/ip-display/IpDisplayCard";
import { IpInfoCard } from "@/features/ip-info/IpInfoCard";
import { MongoidTimestampCard } from "@/features/mongoid-timestamp/MongoidTimestampCard";
import { QrGeneratorCard } from "@/features/qr-generator/QrGeneratorCard";
import { UtcTimeCard } from "@/features/utc-time/UtcTimeCard";
import { UuidGenerator } from "@/features/uuid-generator/UuidGenerator";

export function HomePage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
			<MongoidTimestampCard />
			<UuidGenerator />
			<UtcTimeCard />
			<QrGeneratorCard className="row-span-2" />
			<IpInfoCard className="row-span-2" />
			<IpDisplayCard />
		</div>
	);
}
