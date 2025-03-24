import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function generateMongoIdFromTimestamp(timestamp: Date): string {
	// Convert timestamp to seconds (MongoDB ObjectId uses seconds)
	const seconds = Math.floor(timestamp.getTime() / 1000);
	// Convert to hex and pad to 8 characters
	const timestampHex = seconds.toString(16).padStart(8, "0");
	// Generate random hex for the rest of the ID (16 characters)
	const randomHex = Array.from({ length: 16 }, () =>
		Math.floor(Math.random() * 16).toString(16),
	).join("");
	return timestampHex + randomHex;
}

function generateTimestampFromMongoId(mongoid: string): Date {
	// Extract timestamp from first 8 characters of MongoDB ID
	const timestampHex = mongoid.substring(0, 8);
	// Convert hex to decimal and then to milliseconds
	const timestamp = Number.parseInt(timestampHex, 16) * 1000;
	return new Date(timestamp);
}

export function MongoidTimestampCard() {
	const [mongoid, setMongoid] = useState<string>(() =>
		generateMongoIdFromTimestamp(new Date()),
	);

	const generateNewId = useCallback(() => {
		const now = new Date();
		const newMongoId = generateMongoIdFromTimestamp(now);
		setMongoid(newMongoId);
	}, []);

	useEffect(() => {
		generateNewId();
	}, [generateNewId]);

	const handleMongoidChange = (value: string) => {
		setMongoid(value);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(
			generateTimestampFromMongoId(mongoid).toISOString(),
		);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>MongoDB ID to Timestamp</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						value={mongoid}
						onChange={(e) => handleMongoidChange(e.target.value)}
						placeholder="Enter MongoDB ObjectId"
						className="font-mono"
					/>
					<Button
						onClick={generateNewId}
						variant="outline"
						size="icon"
						className="shrink-0"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex gap-2">
					<Input
						value={generateTimestampFromMongoId(mongoid).toISOString()}
						readOnly
						placeholder="Timestamp will appear here"
						className="font-mono text-lg"
					/>
					<Button
						onClick={handleCopy}
						variant="outline"
						size="icon"
						className="shrink-0"
					>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
