import { Button } from "@/components/ui/button";
import { GITHUB_PROFILE_URL, GITHUB_REPO_URL } from "@/constants/urls";
import { Github } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t p-6 w-full">
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="text-sm text-muted-foreground">
					Built with ❤️ by{" "}
					<a
						href={GITHUB_PROFILE_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium hover:underline"
					>
						Puneet56
					</a>
				</div>
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" className="shrink-0" asChild>
						<a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
							<Github className="h-4 w-4" />
						</a>
					</Button>
					<a
						href={`${GITHUB_REPO_URL}/issues`}
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
