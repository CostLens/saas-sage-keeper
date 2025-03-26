
import React from "react";
import { HrmsUser } from "@/types/hrms";
import { SaaSData } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from "lucide-react";

interface UserBoardingTableProps {
  isLoadingUsers: boolean;
  filteredUsers: HrmsUser[] | undefined;
  mockUserToolMappings: Array<{ userId: string; toolIds: string[] }>;
  mockSaaSData: SaaSData[];
  onOpenOnboard: (user: HrmsUser) => void;
  onOpenOffboard: (user: HrmsUser) => void;
}

export function UserBoardingTable({
  isLoadingUsers,
  filteredUsers,
  mockUserToolMappings,
  mockSaaSData,
  onOpenOnboard,
  onOpenOffboard,
}: UserBoardingTableProps) {
  const getUserTools = (userId: string) => {
    const mapping = mockUserToolMappings.find(m => m.userId === userId);
    if (!mapping) return [];
    return mockSaaSData.filter(tool => mapping.toolIds.includes(tool.id));
  };

  // Extended mock data for tools display
  const getDisplayTools = (userId: string) => {
    const tools = getUserTools(userId);
    // Return only 3 tools for display with a "+X more" indicator if needed
    if (tools.length <= 3) return { display: tools, more: 0 };
    return { display: tools.slice(0, 3), more: tools.length - 3 };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>SaaS Tools</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoadingUsers ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">Loading...</TableCell>
          </TableRow>
        ) : filteredUsers?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">No users found</TableCell>
          </TableRow>
        ) : (
          filteredUsers?.map(user => {
            const toolsInfo = getDisplayTools(user.employee_id);
            return (
              <TableRow key={user.employee_id}>
                <TableCell className="font-medium">{user.employee_id}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'terminated' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {toolsInfo.display.length > 0 ? (
                      <>
                        {toolsInfo.display.map(tool => (
                          <span 
                            key={tool.id} 
                            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
                          >
                            {tool.name}
                          </span>
                        ))}
                        {toolsInfo.more > 0 && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800">
                            +{toolsInfo.more} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">No tools assigned</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onOpenOnboard(user)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Onboard
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onOpenOffboard(user)}
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Offboard
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
