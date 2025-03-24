import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

export function UrlDecoderCard() {
	const [encoded, setEncoded] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	const handleEncodedChange = (value: string) => {
		setEncoded(value);
		try {
			const decodedValue = decodeURIComponent(value);
			setDecoded(decodedValue);
		} catch (error) {
			setDecoded("");
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(decoded);
	};

	const handleGenerate = () => {
		// Generate a sample encoded URL if empty
		if (!encoded) {
			const sample =
				"Hello%20World%21%20This%20is%20a%20sample%20URL%20encoded%20string.";
			setEncoded(sample);
			setDecoded(decodeURIComponent(sample));
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>URL Decoder</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						value={encoded}
						onChange={(e) => handleEncodedChange(e.target.value)}
						placeholder="Enter URL encoded string"
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
					{decoded && (
						<div className="p-4 bg-muted rounded-lg w-full">
							<pre className="whitespace-pre-wrap break-words font-mono text-sm">
								{decoded}
							</pre>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
