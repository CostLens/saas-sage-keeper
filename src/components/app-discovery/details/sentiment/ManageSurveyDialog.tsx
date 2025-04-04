
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ManageSurveyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageSurveyDialog({ open, onOpenChange }: ManageSurveyDialogProps) {
  const { toast } = useToast();
  const [surveyFrequency, setSurveyFrequency] = useState("quarterly");
  const [surveyDate, setSurveyDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage User Survey</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="frequency" className="col-span-1">
              Frequency
            </Label>
            <div className="col-span-3">
              <Select 
                value={surveyFrequency} 
                onValueChange={setSurveyFrequency}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Bi-annually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="oneTime">One-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-1">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild className="col-span-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {surveyDate ? format(surveyDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={surveyDate}
                  onSelect={setSurveyDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipients" className="col-span-1">
              Recipients
            </Label>
            <Input
              id="recipients"
              defaultValue="All active users"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onOpenChange(false);
              toast({
                title: "Survey settings saved",
                description: `Survey will be sent ${surveyFrequency} starting ${surveyDate ? format(surveyDate, "PPP") : "today"}`,
              });
            }}
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
