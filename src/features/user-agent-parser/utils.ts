import { UAParser } from "ua-parser-js";

export interface ParsedUserAgent {
	browser: {
		name: string;
		version: string;
	};
	os: {
		name: string;
		version: string;
	};
	device: {
		type: string;
		vendor?: string;
	};
	engine: {
		name: string;
		version: string;
	};
	cpu: {
		architecture: string;
	};
}

export function parseUserAgent(userAgentString: string): ParsedUserAgent {
	const parser = new UAParser(userAgentString);
	const result = parser.getResult();

	return {
		browser: {
			name: result.browser.name || "Unknown",
			version: result.browser.version || "Unknown",
		},
		os: {
			name: result.os.name || "Unknown",
			version: result.os.version || "Unknown",
		},
		device: {
			type: result.device.type || "Desktop",
			vendor: result.device.vendor,
		},
		engine: {
			name: result.engine.name || "Unknown",
			version: result.engine.version || "Unknown",
		},
		cpu: {
			architecture: result.cpu.architecture || "Unknown",
		},
	};
}
