
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HrmsUser } from "@/types/hrms";
import { getHrmsUsers } from "@/lib/hrmsService";

export const useUserData = (additionalUsers: HrmsUser[]) => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
  const [showOffboardedUsers, setShowOffboardedUsers] = React.useState(false);

  // Fetch users data
  const { 
    data: apiUsers, 
    isLoading: isLoadingUsers, 
    refetch: refetchUsers 
  } = useQuery({
    queryKey: ["hrmsUsers"],
    queryFn: getHrmsUsers,
  });
  
  // Combine API users with additional users
  const hrmsUsers = React.useMemo(() => {
    if (!apiUsers) return additionalUsers;
    
    const existingIds = new Set(apiUsers.map(user => user.employee_id));
    const filteredDummyUsers = additionalUsers.filter(user => !existingIds.has(user.employee_id));
    
    return [...apiUsers, ...filteredDummyUsers];
  }, [apiUsers, additionalUsers]);
  
  // Filter users based on search query, department and status
  const filteredUsers = React.useMemo(() => {
    return hrmsUsers?.filter(user => {
      const matchesSearch = 
        user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.employee_id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = !selectedDepartment || user.department === selectedDepartment;
      const matchesStatus = showOffboardedUsers ? true : user.status === "active";
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [hrmsUsers, searchQuery, selectedDepartment, showOffboardedUsers]);

  // Extract unique departments
  const departments = React.useMemo(() => {
    return [...new Set(hrmsUsers?.map(user => user.department) || [])];
  }, [hrmsUsers]);

  return {
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    showOffboardedUsers,
    setShowOffboardedUsers,
    filteredUsers,
    isLoadingUsers,
    departments,
    refetchUsers
  };
};
