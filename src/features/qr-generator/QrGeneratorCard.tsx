import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { GITHUB_REPO_URL } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

function generateRandomUrl() {
	return `https://example.com/${Math.random().toString(36).substring(7)}`;
}

export function QrGeneratorCard({ className }: { className?: string }) {
	const [url, setUrl] = useState<string>(GITHUB_REPO_URL);
	const [isHoverd, setIsHoverd] = useState<boolean>(false);
	const handleUrlChange = (value: string) => {
		setUrl(value);
	};

	const handleGenerate = () => {
		// Generate a random URL if empty
		if (!url) {
			setUrl(generateRandomUrl());
		}
	};

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<CardTitle>URL to QR Code</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						value={url}
						onChange={(e) => handleUrlChange(e.target.value)}
						placeholder="Enter URL"
						className="font-mono"
					/>
					<RegenerateButton
						onClick={handleGenerate}
						tooltipTitle="Generate random URL"
					/>
					<CopyButton value={url} tooltipTitle="Copy URL" />
				</div>
				<div className="flex justify-center">
					{url && (
						<div className="rounded-lg overflow-clip w-full h-full">
							<QRCodeSVG
								value={url}
								className="w-full h-full"
								level="H"
								bgColor={isHoverd ? "#c0c0c0" : "#ffffff26"}
								includeMargin={true}
								onMouseEnter={() => setIsHoverd(true)}
								onMouseLeave={() => setIsHoverd(false)}
							/>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
