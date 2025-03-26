import { useEffect, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useDebounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
) {
	const timeoutRef = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (...args: Parameters<T>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}
