import { Github, Wrench } from "lucide-react";

export function Header() {
	return (
		<header className="flex items-center justify-between p-4 border-b">
			<div className="flex items-center gap-2">
				<Wrench className="h-6 w-6" />
				<h1 className="text-xl font-bold">BTK: Backend Toolkit</h1>
			</div>
			<a
				href="https://github.com/Puneet56/btk"
				target="_blank"
				rel="noopener noreferrer"
				className="hover:opacity-80 transition-opacity"
			>
				<Github className="h-6 w-6" />
			</a>
		</header>
	);
}
