import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function UtcTimeCard() {
	const [utcTime, setUtcTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setUtcTime(now.toISOString());
		};

		// Update immediately
		updateTime();

		// Update every second
		const interval = setInterval(updateTime, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, []);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>UTC Time</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input value={utcTime} readOnly className="font-mono text-lg" />
					<CopyButton value={utcTime} tooltipTitle="Copy UTC time" />
				</div>
			</CardContent>
		</Card>
	);
}
