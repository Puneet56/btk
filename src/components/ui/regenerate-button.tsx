import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCw } from "lucide-react";

interface RegenerateButtonProps {
	onClick: () => void;
	className?: string;
	tooltipTitle?: string;
}

export function RegenerateButton({
	onClick,
	className,
	tooltipTitle = "Generate new",
}: RegenerateButtonProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						onClick={onClick}
						variant="outline"
						size="icon"
						className={`shrink-0 ${className}`}
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{tooltipTitle}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
