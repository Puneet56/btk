import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCopyIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

const UUIDGenerator = () => {
  const [uuid, setUuid] = useState(() => crypto.randomUUID());

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(uuid);
    } catch (error) {
      console.error("Failed to copy UUID:", error);
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Random UUID</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input placeholder="UUID" value={uuid} readOnly />
        <Button
          variant={"outline"}
          size={"lg"}
          className="pointer-events-auto cursor-pointer"
          onClick={() => setUuid(crypto.randomUUID())}
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

export default UUIDGenerator;
