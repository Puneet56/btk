import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { RegenerateButton } from "@/components/ui/regenerate-button";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4, v7 as uuidv7 } from "uuid";
import { useState } from "react";

export function UuidGenerator() {
	const [uuidv4Value, setUuidv4Value] = useState<string>(uuidv4());
	const [uuidv7Value, setUuidv7Value] = useState<string>(uuidv7());

	const generateNewUuids = () => {
		setUuidv4Value(uuidv4());
		setUuidv7Value(uuidv7());
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>UUID Generator</CardTitle>
					<RegenerateButton
						onClick={generateNewUuids}
						tooltipTitle="Generate new UUIDs"
					/>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label>UUID v4 (Random)</Label>
					<div className="flex items-center gap-2">
						<Input
							type="text"
							value={uuidv4Value}
							readOnly
							className="flex-1"
						/>
						<CopyButton value={uuidv4Value} tooltipTitle="Copy UUID v4" />
					</div>
				</div>
				<div className="space-y-2">
					<Label>UUID v7 (Time-ordered)</Label>
					<div className="flex items-center gap-2">
						<Input
							type="text"
							value={uuidv7Value}
							readOnly
							className="flex-1"
						/>
						<CopyButton value={uuidv7Value} tooltipTitle="Copy UUID v7" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
