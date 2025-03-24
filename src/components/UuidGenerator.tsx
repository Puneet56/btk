import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

export function UuidGenerator() {
	const [uuid, setUuid] = useState(crypto.randomUUID());

	const generateNewUuid = () => {
		setUuid(crypto.randomUUID());
	};

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(uuid);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>UUID Generator</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={uuid}
						readOnly
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
					<Button
						variant="outline"
						size="icon"
						onClick={generateNewUuid}
						className="shrink-0"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={copyToClipboard}
						className="shrink-0"
					>
						<Copy className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
