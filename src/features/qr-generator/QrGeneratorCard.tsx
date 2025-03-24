import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function QrGeneratorCard() {
	const [url, setUrl] = useState<string>("");

	const handleUrlChange = (value: string) => {
		setUrl(value);
	};

	const handleGenerate = () => {
		// Generate a random URL if empty
		if (!url) {
			setUrl(`https://example.com/${Math.random().toString(36).substring(7)}`);
		}
	};

	return (
		<Card className="w-full">
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
						<div className="p-4 bg-white rounded-lg">
							<QRCodeSVG
								value={url}
								size={200}
								level="H"
								includeMargin={true}
							/>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
