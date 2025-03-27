import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { ParsedUserAgent } from "./utils";
import { parseUserAgent } from "./utils";
import { CopyButton } from "@/components/ui/copy-button";

export function UserAgentParser() {
	const [userAgent, setUserAgent] = useState("");
	const [parsedInfo, setParsedInfo] = useState<ParsedUserAgent | null>(null);

	useEffect(() => {
		const currentUserAgent = navigator.userAgent;
		setUserAgent(currentUserAgent);
		setParsedInfo(parseUserAgent(currentUserAgent));
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setUserAgent(value);
		if (value) {
			const parsed = parseUserAgent(value);
			setParsedInfo(parsed);
		} else {
			setParsedInfo(null);
		}
	};

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
							/>
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
