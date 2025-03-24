
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";

interface UserBoardingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
  showOffboardedUsers: boolean;
  setShowOffboardedUsers: (show: boolean) => void;
  departments: string[];
}

export function UserBoardingFilters({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  showOffboardedUsers,
  setShowOffboardedUsers,
  departments
}: UserBoardingFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="department" className="min-w-[80px]">Department:</Label>
              <select 
                id="department"
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="showOffboarded">Show Offboarded:</Label>
              <Switch 
                id="showOffboarded" 
                checked={showOffboardedUsers}
                onCheckedChange={setShowOffboardedUsers}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
