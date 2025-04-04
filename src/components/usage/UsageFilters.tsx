
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface UsageFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  timeRange: "30days" | "90days" | "6months" | "1year" | "custom";
  setTimeRange: (range: "30days" | "90days" | "6months" | "1year" | "custom") => void;
  dateRange: {
    from: Date;
    to: Date;
  };
  setDateRange: (range: { from: Date; to: Date }) => void;
  filterCategory: "all" | "high" | "optimal" | "low";
  setFilterCategory: (category: "all" | "high" | "optimal" | "low") => void;
}

export function UsageFilters({
  searchQuery,
  setSearchQuery,
  timeRange,
  setTimeRange,
  dateRange,
  setDateRange,
  filterCategory,
  setFilterCategory,
}: UsageFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="timeRange" className="whitespace-nowrap">Time Range:</Label>
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value as any)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {timeRange === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Pick a date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({
                          from: range.from,
                          to: range.to,
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="category" className="whitespace-nowrap">Category:</Label>
              <Select
                value={filterCategory}
                onValueChange={(value) => setFilterCategory(value as any)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="high">High utilization</SelectItem>
                  <SelectItem value="optimal">Optimal utilization</SelectItem>
                  <SelectItem value="low">Low utilization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
