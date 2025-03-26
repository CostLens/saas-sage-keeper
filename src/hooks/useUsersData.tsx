
import { useQuery } from "@tanstack/react-query";
import type { HrmsUser } from "@/types/hrms";
import { getHrmsUsers } from "@/lib/hrmsService";
import React from "react";

export const useUsersData = (additionalUsers: HrmsUser[]) => {
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

  return {
    hrmsUsers,
    isLoadingUsers,
    refetchUsers
  };
};
