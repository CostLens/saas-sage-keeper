
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Download, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface UsageControlsProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export function UsageControls({ 
  timeRange, setTimeRange, 
  startDate, setStartDate, 
  endDate, setEndDate 
}: UsageControlsProps) {
  const handleExport = () => {
    // Logic to export usage data
    alert("Export functionality would download a CSV of usage data");
  };

  const handleFilterClick = () => {
    // Logic to show advanced filters
    alert("Filter dialog would open here");
  };

  const displayDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM dd, yyyy")} - ${format(endDate, "MMM dd, yyyy")}`;
    }
    return "Select date range";
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-end">
      <div className="flex items-center gap-2">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>

        {timeRange === "custom" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left">
                <Calendar className="mr-2 h-4 w-4" />
                {displayDateRange()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Start Date</h4>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">End Date</h4>
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => startDate ? date < startDate : false}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      
      <Button size="sm" variant="outline" onClick={handleFilterClick}>
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      
      <Button size="sm" variant="outline" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}
