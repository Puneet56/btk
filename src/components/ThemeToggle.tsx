import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(() => {
		if (typeof window !== "undefined") {
			return document.documentElement.classList.contains("dark");
		}
		return true;
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			className="shrink-0"
		>
			{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
		</Button>
	);
}
