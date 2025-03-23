import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCopyIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

const MongoId = () => {
  const [id, setId] = useState(() => objectIdFromDate(new Date()));

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(dateFromObjectId(id).toISOString());
    } catch (error) {
      console.error("Failed to copy date:", error);
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Mongo ID to Date</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          placeholder="Object ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="Date"
          value={id.length > 0 ? dateFromObjectId(id).toISOString() : ""}
          readOnly
        />
        <Button
          variant={"outline"}
          size={"lg"}
          className="pointer-events-auto cursor-pointer"
          onClick={() => setId(() => objectIdFromDate(new Date()))}
        >
          <RefreshCcwIcon />
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          className="pointer-events-auto cursor-pointer"
          onClick={handleCopy}
        >
          <ClipboardCopyIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default MongoId;

const objectIdFromDate = (date: Date) => {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

const dateFromObjectId = (objectId: string) => {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};
