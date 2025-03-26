import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface JsonPrettifierCardProps {
	className?: string;
}

export function JsonPrettifierCard({ className }: JsonPrettifierCardProps) {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const formatJson = (jsonString: string) => {
		try {
			if (!jsonString.trim()) {
				setOutput("");
				setError(null);
				return;
			}
			const parsed = JSON.parse(jsonString);
			setOutput(JSON.stringify(parsed, null, 2));
			setError(null);
		} catch (err) {
			setError("Invalid JSON");
			setOutput("");
		}
	};

	return (
		<Card className={cn("col-span-2", className)}>
			<CardHeader>
				<CardTitle>JSON Prettifier</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-8">
					<div className="space-y-2">
						<label htmlFor="json-input" className="text-sm font-medium">
							Input JSON
						</label>
						<Textarea
							id="json-input"
							placeholder="Paste your JSON here..."
							className="h-[600px] font-mono resize-none overflow-y-scroll"
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
								formatJson(e.target.value);
							}}
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="json-output" className="text-sm font-medium">
							Prettified Output
						</label>
						<Textarea
							id="json-output"
							readOnly
							className={cn(
								"h-[600px] font-mono resize-none overflow-y-scroll",
								error ? "border-red-500" : output ? "border-green-500" : "",
							)}
							value={error || output}
							placeholder="Prettified JSON will appear here..."
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
