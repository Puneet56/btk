import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { parseUserAgent } from "./utils";
import { CopyButton } from "@/components/ui/copy-button";

const sampleUserAgents = [
	{
		label: "Windows (Chrome)",
		user_agent:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
	},
	{
		label: "macOS (Safari)",
		user_agent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
	},
	{
		label: "macOS (Firefox)",
		user_agent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:127.0) Gecko/20100101 Firefox/127.0",
	},
	{
		label: "Linux (Chrome)",
		user_agent:
			"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
	},
	{
		label: "Android (Chrome)",
		user_agent:
			"Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
	},
	{
		label: "iOS (Safari)",
		user_agent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
	},
	{
		label: "iOS (Chrome)",
		user_agent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.0.0 Mobile/15E148 Safari/604.1",
	},
	{
		label: "Android Tablet (Chrome)",
		user_agent:
			"Mozilla/5.0 (Linux; Android 13; SM-X900) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
	},
	{
		label: "iPad (Safari)",
		user_agent:
			"Mozilla/5.0 (iPad; CPU OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
	},
	{
		label: "Googlebot",
		user_agent:
			"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
	},
	{
		label: "Edge (Windows)",
		user_agent:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
	},
];

export function UserAgentParser() {
	const [userAgent, setUserAgent] = useState("");
	const [selectedSample, setSelectedSample] = useState("");

	useEffect(() => {
		const currentUserAgent = navigator.userAgent;
		setUserAgent(currentUserAgent);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUserAgent(value);
		setSelectedSample("");
	};

	const handleSampleSelect = (value: string) => {
		setSelectedSample(value);
		const selected = sampleUserAgents.find((sample) => sample.label === value);
		if (selected) {
			setUserAgent(selected.user_agent);
		}
	};

	const parsedInfo = parseUserAgent(userAgent);

	return (
		<div className="container mx-auto p-4 space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>User Agent Parser</CardTitle>
					<CardDescription>
						Parse and analyze user agent strings to get detailed information
						about browsers, devices, and operating systems.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="user-agent">User Agent String</Label>
						<div className="flex gap-2">
							<Input
								id="user-agent"
								placeholder="Enter a user agent string..."
								value={userAgent}
								onChange={handleInputChange}
								className="flex-1"
							/>
							<Select value={selectedSample} onValueChange={handleSampleSelect}>
								<SelectTrigger className="w-[200px]">
									<SelectValue placeholder="Sample User Agents" />
								</SelectTrigger>
								<SelectContent>
									{sampleUserAgents.map((sample) => (
										<SelectItem key={sample.label} value={sample.label}>
											{sample.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<CopyButton value={userAgent} tooltipTitle="Copy User Agent" />
						</div>
					</div>

					{parsedInfo && (
						<div className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Parsed Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label>Browser</Label>
											<p className="text-sm">
												{parsedInfo.browser.name} {parsedInfo.browser.version}
											</p>
										</div>
										<div>
											<Label>Operating System</Label>
											<p className="text-sm">
												{parsedInfo.os.name} {parsedInfo.os.version}
											</p>
										</div>
										<div>
											<Label>Device</Label>
											<p className="text-sm">
												{parsedInfo.device.type || "Desktop"}
											</p>
										</div>
										<div>
											<Label>Engine</Label>
											<p className="text-sm">
												{parsedInfo.engine.name} {parsedInfo.engine.version}
											</p>
										</div>
										<div>
											<Label>CPU</Label>
											<p className="text-sm">{parsedInfo.cpu.architecture}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
