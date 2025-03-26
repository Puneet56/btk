import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Minimize2 } from "lucide-react";
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

	const minifyJson = () => {
		try {
			if (!input.trim()) return;
			const parsed = JSON.parse(input);
			setInput(JSON.stringify(parsed));
			formatJson(JSON.stringify(parsed));
		} catch (err) {
			// Don't update input if it's invalid JSON
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
						<div className="flex items-center justify-between">
							<label htmlFor="json-input" className="text-sm font-medium">
								Input JSON
							</label>
							<div className="flex gap-2">
								<CopyButton value={input} />
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="outline"
												size="icon"
												onClick={minifyJson}
												className="shrink-0"
											>
												<Minimize2 className="h-4 w-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Minify JSON</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
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
						<div className="flex items-center justify-between">
							<label htmlFor="json-output" className="text-sm font-medium">
								Prettified Output
							</label>
							<CopyButton value={output} />
						</div>
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
