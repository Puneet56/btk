import { Button } from "@/components/ui/button";
import { Github, Wrench } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
	return (
		<header className="w-full border-b bg-background">
			<div className="container flex items-center justify-between p-4">
				<div className="flex items-center gap-2">
					<Wrench className="h-6 w-6" />
					<h1 className="text-xl font-bold">BTK: Backend Toolkit</h1>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button variant="outline" size="icon" className="shrink-0" asChild>
						<a
							href="https://github.com/Puneet56/btk"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-4 w-4" />
						</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
