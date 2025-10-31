import { cn } from "@/_lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { FileTextIcon, UploadIcon } from "lucide-react";
const Documents = ({ newSchedule, setNewSchedule }: any) => {
  return (
    <Card className="p-2 py-4 w-full">
      <CardContent className="p-0 flex flex-col gap-4">
        <div className="w-full flex flex-col justify-center items-center border-dashed border border-background py-4 rounded-md">
          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            id="file-upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setNewSchedule({
                  ...newSchedule,
                  document: file,
                });
              }
            }}
          />
          <Button
            variant={"ghost"}
            className="flex flex-col items-center gap-2 h-fit"
            asChild
          >
            <Label htmlFor="file-upload">
              <span className="p-2 bg-primary text-primary-foreground rounded-full">
                <UploadIcon />
              </span>
              {newSchedule.document?.name ? (
                <div className="flex items-center gap-2">
                  <FileTextIcon className="text-primary-foreground" />
                  <p className="text-foreground">
                    {newSchedule.document?.name}
                  </p>
                </div>
              ) : (
                <>
                  <p>Faça upload do edital</p>
                  <small className="text-muted-foreground text-xs">
                    São aceitos arquivos PDF de até 10Mb
                  </small>
                </>
              )}
            </Label>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Documents;
