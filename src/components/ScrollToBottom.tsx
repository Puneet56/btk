import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ScrollToBottom() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isAtBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100;
			setShow(!isAtBottom);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check initial state

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	};

	if (!show) return null;

	return (
		<Button
			onClick={scrollToBottom}
			size="icon"
			className="fixed bottom-8 right-8 rounded-full shadow-lg"
		>
			<ArrowDown className="h-4 w-4" />
		</Button>
	);
}
