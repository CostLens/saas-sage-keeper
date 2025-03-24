
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DocumentUploadDialog = ({ open, onOpenChange }: DocumentUploadDialogProps) => {
  const [documentType, setDocumentType] = useState<string>("");
  const [saasName, setSaasName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType || !saasName) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and select a file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Document uploaded",
      description: `${selectedFile.name} has been uploaded successfully.`
    });

    // Reset form
    setSelectedFile(null);
    setDocumentType("");
    setSaasName("");
    setIsUploading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a contract or invoice document to the repository.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documentType" className="text-right">
              Type
            </Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Invoice">Invoice</SelectItem>
                <SelectItem value="Amendment">Amendment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="saasName" className="text-right">
              SaaS
            </Label>
            <Input
              id="saasName"
              placeholder="SaaS application name"
              value={saasName}
              onChange={(e) => setSaasName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <div className="col-span-3">
              {selectedFile ? (
                <div className="flex items-center gap-2 p-2 border rounded-md">
                  <File className="h-4 w-4" />
                  <span className="text-sm truncate">{selectedFile.name}</span>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-accent/50 transition-colors">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload</span>
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
