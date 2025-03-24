import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
	value: string;
	className?: string;
	tooltipTitle?: string;
}

export function CopyButton({
	value,
	className,
	tooltipTitle = "Copy to clipboard",
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={handleCopy}
						variant="outline"
						size="icon"
						className={`shrink-0 ${className}`}
					>
						{copied ? (
							<Check className="h-4 w-4 text-green-500" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{copied ? "Copied!" : tooltipTitle}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
