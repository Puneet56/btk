import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function UtcTimeCard() {
	const [utcTime, setUtcTime] = useState<string>("");
	const [unixTime, setUnixTime] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const updateFromDate = useCallback((date: Date) => {
		setUtcTime(date.toISOString());
		setUnixTime(Math.floor(date.getTime() / 1000).toString());
		setError(null);
	}, []);

	const handleUtcTimeChange = (value: string) => {
		try {
			const date = new Date(value);
			if (Number.isNaN(date.getTime())) {
				throw new Error("Invalid date format");
			}
			updateFromDate(date);
		} catch (err) {
			setError("Invalid ISO 8601 format");
			setUtcTime(value);
		}
	};

	const handleUnixTimeChange = (value: string) => {
		try {
			const timestamp = Number.parseInt(value, 10);
			if (Number.isNaN(timestamp)) {
				throw new Error("Invalid number");
			}
			const date = new Date(timestamp * 1000);
			if (Number.isNaN(date.getTime())) {
				throw new Error("Invalid timestamp");
			}
			updateFromDate(date);
		} catch (err) {
			setError("Invalid Unix timestamp");
			setUnixTime(value);
		}
	};

	useEffect(() => {
		const updateTime = () => {
			if (!utcTime && !unixTime) {
				updateFromDate(new Date());
			}
		};

		// Update immediately
		updateTime();

		// Update every second if no manual input
		const interval = setInterval(updateTime, 1000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, [utcTime, unixTime, updateFromDate]);

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle>UTC Time</CardTitle>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								onClick={() => updateFromDate(new Date())}
								className="shrink-0"
							>
								<RotateCw className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Update to current time</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="utc-time" className="text-sm font-medium">
						ISO 8601
					</Label>
					<div className="flex gap-2">
						<Input
							id="utc-time"
							value={utcTime}
							onChange={(e) => handleUtcTimeChange(e.target.value)}
							className={cn("font-mono text-lg", error && "border-red-500")}
						/>
						<CopyButton value={utcTime} tooltipTitle="Copy UTC time" />
					</div>
				</div>
				<div className="space-y-2">
					<Label htmlFor="unix-time" className="text-sm font-medium">
						Unix Timestamp
					</Label>
					<div className="flex gap-2">
						<Input
							id="unix-time"
							value={unixTime}
							onChange={(e) => handleUnixTimeChange(e.target.value)}
							className={cn("font-mono text-lg", error && "border-red-500")}
						/>
						<CopyButton value={unixTime} tooltipTitle="Copy Unix timestamp" />
					</div>
				</div>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</CardContent>
		</Card>
	);
}
