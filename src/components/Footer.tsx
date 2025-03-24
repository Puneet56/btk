import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t py-6 sticky bottom-0 w-full">
			<div className="container flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="text-sm text-muted-foreground">
					Built with ❤️ by{" "}
					<a
						href="https://github.com/Puneet56"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium hover:underline"
					>
						Puneet56
					</a>
				</div>
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" className="shrink-0" asChild>
						<a
							href="https://github.com/Puneet56/btk"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-4 w-4" />
						</a>
					</Button>
					<a
						href="https://github.com/Puneet56/btk/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-muted-foreground hover:underline"
					>
						Report an issue
					</a>
				</div>
			</div>
		</footer>
	);
}
