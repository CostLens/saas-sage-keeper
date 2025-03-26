
import { useState } from "react";
import type { HrmsUser } from "@/types/hrms";

export const useUserFilters = (hrmsUsers: HrmsUser[] | undefined) => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [showOffboardedUsers, setShowOffboardedUsers] = useState(false);
  
  // Extract unique departments
  const departments = [...new Set(hrmsUsers?.map(user => user.department) || [])];
  
  // Filter users based on search query, department and status
  const filteredUsers = hrmsUsers?.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
    const matchesStatus = showOffboardedUsers ? true : user.status === "active";
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    showOffboardedUsers,
    setShowOffboardedUsers,
    departments,
    filteredUsers
  };
};
