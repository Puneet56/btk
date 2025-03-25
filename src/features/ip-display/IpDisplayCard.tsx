import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { API_ENDPOINTS } from "@/constants/urls";
import { useQuery } from "@tanstack/react-query";

interface IpResponse {
	ip: string;
}

const fetchIpv4 = async (): Promise<IpResponse> => {
	const response = await fetch(API_ENDPOINTS.IPV4_API);
	return response.json();
};

const fetchIpv6 = async (): Promise<IpResponse> => {
	const response = await fetch(API_ENDPOINTS.IPV6_API);
	return response.json();
};

const isIpv6 = (ip: string): boolean => {
	return ip.includes(":");
};

export const IpDisplayCard = () => {
	const { data: ipv4Data, isLoading: ipv4Loading } = useQuery({
		queryKey: ["ipv4"],
		queryFn: fetchIpv4,
	});

	const { data: ipv6Data, isLoading: ipv6Loading } = useQuery({
		queryKey: ["ipv6"],
		queryFn: fetchIpv6,
	});

	const showIpv6 = ipv6Data?.ip && isIpv6(ipv6Data.ip);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>IP Details</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="ipv4"
						className="text-sm font-medium text-muted-foreground"
					>
						IPv4
					</label>
					<div className="flex gap-2">
						<Input
							id="ipv4"
							value={ipv4Loading ? "Loading..." : ipv4Data?.ip}
							readOnly
							className="font-mono text-lg"
						/>
						<CopyButton value={ipv4Data?.ip || ""} tooltipTitle="Copy IPv4" />
					</div>
				</div>
				{showIpv6 && (
					<div className="space-y-2">
						<label
							htmlFor="ipv6"
							className="text-sm font-medium text-muted-foreground"
						>
							IPv6
						</label>
						<div className="flex gap-2">
							<Input
								id="ipv6"
								value={ipv6Loading ? "Loading..." : ipv6Data?.ip}
								readOnly
								className="font-mono text-lg"
							/>
							<CopyButton value={ipv6Data?.ip || ""} tooltipTitle="Copy IPv6" />
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
