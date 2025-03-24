import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function QrGeneratorCard() {
	const [url, setUrl] = useState<string>("");

	const handleUrlChange = (value: string) => {
		setUrl(value);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(url);
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
					<Button
						onClick={handleGenerate}
						variant="outline"
						size="icon"
						className="shrink-0"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
					<Button
						onClick={handleCopy}
						variant="outline"
						size="icon"
						className="shrink-0"
					>
						<Copy className="h-4 w-4" />
					</Button>
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
