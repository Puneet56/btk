import { AlertCircle, RefreshCw } from "lucide-react";
import { Component } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
	children: React.ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public resetError = () => {
		this.setState({ hasError: false, error: undefined });
	};

	public render() {
		if (this.state.hasError) {
			return (
				<Card className="border-destructive">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-destructive">
							<AlertCircle className="h-5 w-5" />
							Something went wrong
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="text-sm text-muted-foreground">
							{this.state.error?.message || "An unexpected error occurred"}
						</div>
						<Button
							variant="outline"
							className="flex items-center gap-2"
							onClick={this.resetError}
						>
							<RefreshCw className="h-4 w-4" />
							Try again
						</Button>
					</CardContent>
				</Card>
			);
		}

		return this.props.children;
	}
}
