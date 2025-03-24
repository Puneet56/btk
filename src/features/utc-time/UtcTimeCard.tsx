import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function UtcTimeCard() {
	const [utcTime, setUtcTime] = useState<string>("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setUtcTime(now.toUTCString());
		};

		// Update immediately
		updateTime();

		// Update every second
		const interval = setInterval(updateTime, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(utcTime);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>UTC Time</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input value={utcTime} readOnly className="font-mono text-lg" />
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
