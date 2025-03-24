import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { useState } from "react";

export function UuidGenerator() {
	const [uuid, setUuid] = useState(crypto.randomUUID());

	const generateNewUuid = () => {
		setUuid(crypto.randomUUID());
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>UUID Generator</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-2">
					<Input type="text" value={uuid} readOnly />
					<RegenerateButton
						onClick={generateNewUuid}
						tooltipTitle="Generate new UUID"
					/>
					<CopyButton value={uuid} tooltipTitle="Copy UUID" />
				</div>
			</CardContent>
		</Card>
	);
}
