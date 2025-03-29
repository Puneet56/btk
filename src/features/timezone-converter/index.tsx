import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TIMEZONE } from "@/constants/timezone";
import { Watch } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment-timezone";

function convertTimezone(date: string | Date, fromTZ: string, toTZ: string) {
    if (!date) return "Invalid Date";
  
    try {
      let fromDate;
  
      if (typeof date === "string") {
        fromDate = moment.tz(date, "YYYY-MM-DD HH:mm:ss", fromTZ);
      } else {
        fromDate = moment(date).tz(fromTZ); 
      }
  
      if (!fromDate.isValid()) return "Invalid Date";
  
      // Convert to target timezone
      const toDate = fromDate.clone().tz(toTZ);
  
      // Format output explicitly
      return toDate.format("YYYY-MM-DD HH:mm:ss z");
    } catch (error) {
      return "Invalid Date";
    }
  }
  
const TimezoneConverter = () => {
  const [convertedTime, setConvertedTime] = useState("");
  const [utcDate, setUtcDate] = useState(new Date().toISOString());
  const [fromTimezone, setFromTimezone] = useState("Asia/Kolkata");
  const [toTimezone, setToTimezone] = useState("UTC");
  const [error, setError] = useState<string | null>(null);

  const handleConversion = (utcDate: string, fromTimezone: string, toTimezone: string) => {

    const converted = convertTimezone(utcDate, fromTimezone, toTimezone);
    setConvertedTime(converted !== "Invalid Date" ? converted : "");
    setError(converted === "Invalid Date" ? "Invalid date format" : null);
  };

  const handleDateChange = (value: string) => {
    if (!value.trim()) return;

    let formattedValue = value.trim();

    if (!/[zZ]|[+-]\d{2}:\d{2}$/.test(formattedValue)) {
      formattedValue += "Z"; 
    }

    let parsedDate = moment(formattedValue, moment.ISO_8601, true); 

    if (!parsedDate.isValid()) {
      parsedDate = moment(formattedValue, "YYYY-MM-DD HH:mm:ssZ", true);
    }

    if (!parsedDate.isValid()) {
      setError("Invalid date format. Use ISO or a recognizable format.");
      return;
    }

    setUtcDate(formattedValue);
    setError(null);
  };

  useEffect(() => {
    handleConversion(utcDate, fromTimezone, toTimezone);
  }, [fromTimezone, toTimezone, utcDate]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Timezone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fromTimezone">From Timezone</Label>
          <Select value={fromTimezone} onValueChange={setFromTimezone}>
            <SelectTrigger className="w-[425px]">
              <SelectValue placeholder="Select Timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE.map(tz => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="toTimezone">To Timezone</Label>
          <Select value={toTimezone} onValueChange={setToTimezone}>
            <SelectTrigger className="w-[425px]">
              <SelectValue placeholder="Select Timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE.map(tz => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="text"
            placeholder="Paste or enter date..."
            value={utcDate}
            onChange={e => handleDateChange(e.target.value)}
            onPaste={e => {
              e.preventDefault(); // Prevent default paste behavior
              const pastedValue = e.clipboardData.getData("text").trim();
              if (pastedValue) {
                handleDateChange(pastedValue); // Handle pasted value properly
              }
            }}
            className={cn("font-mono text-lg", error && "border-red-500")}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="space-y-2">
          {convertedTime && (
            <div className="flex gap-2">
              <div className="flex items-center gap-2 font-semibold">
                <Watch className="h-5 w-5" />
                <span>Converted Time</span>
              </div>
              {convertedTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimezoneConverter;
