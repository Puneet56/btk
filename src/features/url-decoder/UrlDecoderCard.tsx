import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function UrlDecoderCard({ className }: { className?: string }) {
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
		<Card className={cn("w-full", className)}>
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
					<RegenerateButton
						onClick={handleGenerate}
						tooltipTitle="Generate sample URL"
					/>
					<CopyButton value={decoded} tooltipTitle="Copy decoded URL" />
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
