import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ChangeEvent } from "react";
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

	const handleDecodedChange = (value: string) => {
		setDecoded(value);
		try {
			const encodedValue = encodeURIComponent(value);
			setEncoded(encodedValue);
		} catch (error) {
			setEncoded("");
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
				<CardTitle>URL Encoder-Decoder</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="encoded"
						className="text-sm font-medium text-muted-foreground"
					>
						Encoded URL
					</label>
					<div className="flex gap-2">
						<Textarea
							id="encoded"
							value={encoded}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								handleEncodedChange(e.target.value)
							}
							placeholder="Enter URL encoded string"
							className="font-mono min-h-48"
						/>
						<div className="flex flex-col gap-2">
							<RegenerateButton
								onClick={handleGenerate}
								tooltipTitle="Generate sample URL"
							/>
							<CopyButton value={encoded} tooltipTitle="Copy encoded URL" />
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="decoded"
						className="text-sm font-medium text-muted-foreground"
					>
						Decoded URL
					</label>
					<div className="flex gap-2">
						<Textarea
							id="decoded"
							value={decoded}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								handleDecodedChange(e.target.value)
							}
							placeholder="Enter text to encode"
							className="font-mono min-h-48"
						/>
						<CopyButton value={decoded} tooltipTitle="Copy decoded URL" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
