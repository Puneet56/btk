import { useEffect, useState } from "react";
import { useDebounce } from "../lib/hooks/use-debounce";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function Clipboard() {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState("");

	// Create a debounced save function
	const debouncedSave = useDebounce((value: string) => {
		localStorage.setItem("clipboard-content", value);
	}, 500); // 500ms delay

	useEffect(() => {
		// Load content from localStorage on mount
		const savedContent = localStorage.getItem("clipboard-content");
		if (savedContent) {
			setContent(savedContent);
		}

		// Handle keyboard shortcut
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen(!isOpen);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newContent = e.target.value;
		setContent(newContent);
		debouncedSave(newContent);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="min-w-[90vw] min-h-[90vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Clipboard</DialogTitle>
				</DialogHeader>
				<textarea
					value={content}
					onChange={handleContentChange}
					className={cn(
						"flex-1 w-full p-4 rounded-md border bg-background text-sm ring-offset-background",
						"placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50",
					)}
					placeholder="Paste your content here..."
				/>
			</DialogContent>
		</Dialog>
	);
}
