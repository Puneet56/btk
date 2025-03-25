import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_ENDPOINTS, getIpInfoUrl } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Globe2, MapPin, Search, Wifi } from "lucide-react";
import { useState } from "react";

interface IpResponse {
	ip: string;
}

interface IpInfo {
	query: string;
	status: string;
	continent: string;
	continentCode: string;
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	district: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	offset: number;
	currency: string;
	isp: string;
	org: string;
	as: string;
	asname: string;
	reverse: string;
	mobile: boolean;
	proxy: boolean;
	hosting: boolean;
}

const fetchIpv4 = async (): Promise<IpResponse> => {
	const response = await fetch(API_ENDPOINTS.IPV4_API);
	return response.json();
};

const fetchIpInfo = async (ip: string): Promise<IpInfo> => {
	const response = await fetch(getIpInfoUrl(ip));
	if (!response.ok) {
		throw new Error("Failed to fetch IP info");
	}
	const data = await response.json();

	// Check if the API returned a failure response
	if (data.status === "fail") {
		throw new Error(data.message || "Invalid IP address");
	}

	return data;
};

interface IpInfoCardProps {
	className?: string;
}

export function IpInfoCard({ className }: IpInfoCardProps) {
	const [ip, setIp] = useState<string>("");

	// Get the user's IP address
	const { data: ipv4Data } = useQuery({
		queryKey: ["ipv4"],
		queryFn: fetchIpv4,
	});

	// Use the entered IP or the user's IP as default
	const targetIp = ip || ipv4Data?.ip || "";

	// Fetch IP info
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["ipInfo"],
		queryFn: () => fetchIpInfo(targetIp),
		enabled: !!targetIp,
		retry: false,
		placeholderData: {
			query: "127.0.0.1",
			status: "success",
			continent: "Unknown",
			continentCode: "Unknown",
			country: "Unknown",
			countryCode: "Unknown",
			region: "Unknown",
			regionName: "Unknown",
			city: "Unknown",
			district: "Unknown",
			zip: "Unknown",
			lat: 0,
			lon: 0,
			timezone: "Unknown",
			offset: 0,
			currency: "Unknown",
			isp: "Unknown",
			org: "Unknown",
			as: "Unknown",
			asname: "Unknown",
			reverse: "Unknown",
			mobile: false,
			proxy: false,
			hosting: false,
		},
	});

	const handleSearch = () => {
		if (ip) {
			refetch();
		}
	};

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<CardTitle>IP Info Lookup</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex gap-2">
					<Input
						value={ip}
						onChange={(e) => setIp(e.target.value)}
						placeholder={ipv4Data?.ip || "Enter IP address"}
						className="font-mono"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch();
							}
						}}
					/>
					<Button onClick={handleSearch} disabled={isLoading}>
						<Search className="h-4 w-4" />
					</Button>
				</div>

				{isLoading && (
					<div className="text-center text-muted-foreground">Loading...</div>
				)}

				{error && (
					<div className="text-center text-destructive">
						Failed to fetch IP information
					</div>
				)}

				{data && (
					<div className="space-y-6">
						{/* Location Information */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 font-semibold">
								<MapPin className="h-5 w-5" />
								<span>Location Information</span>
							</div>
							<div className="grid grid-cols-2 gap-2 text-sm pl-7">
								<div className="font-medium">City</div>
								<div>{data.city}</div>
								<div className="font-medium">Region</div>
								<div>{data.regionName}</div>
								<div className="font-medium">Country</div>
								<div>{`${data.country} (${data.countryCode})`}</div>
								<div className="font-medium">Coordinates</div>
								<div>{`${data.lat}, ${data.lon}`}</div>
								<div className="font-medium">ZIP Code</div>
								<div>{data.zip}</div>
							</div>
						</div>

						{/* Network Information */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 font-semibold">
								<Wifi className="h-5 w-5" />
								<span>Network Information</span>
							</div>
							<div className="grid grid-cols-2 gap-2 text-sm pl-7">
								<div className="font-medium">ISP</div>
								<div>{data.isp}</div>
								<div className="font-medium">Organization</div>
								<div>{data.org}</div>
								<div className="font-medium">AS</div>
								<div>{data.as}</div>
								<div className="font-medium">Reverse DNS</div>
								<div className="break-all">{data.reverse}</div>
							</div>
						</div>

						{/* Additional Details */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 font-semibold">
								<Globe2 className="h-5 w-5" />
								<span>Additional Details</span>
							</div>
							<div className="grid grid-cols-2 gap-2 text-sm pl-7">
								<div className="font-medium">Timezone</div>
								<div>{data.timezone}</div>
								<div className="font-medium">Currency</div>
								<div>{data.currency}</div>
								<div className="font-medium">Connection Type</div>
								<div>
									{data.mobile
										? "Mobile"
										: data.hosting
											? "Hosting"
											: "Regular"}
								</div>
								<div className="font-medium">Proxy/VPN</div>
								<div>{data.proxy ? "Yes" : "No"}</div>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
