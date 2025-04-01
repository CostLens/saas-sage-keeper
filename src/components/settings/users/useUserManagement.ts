
import { useState } from "react";
import { toast } from "sonner";
import { User, UserRole } from "./types";
import { InviteUserFormValues } from "./InviteUserDialog";

export function useUserManagement() {
  // Mock data for users
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      active: true,
      lastLogin: "2023-09-12",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "editor",
      active: true,
      lastLogin: "2023-09-10",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "viewer",
      active: false,
      lastLogin: "2023-08-28",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "editor",
      active: true,
      lastLogin: "2023-09-11",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "viewer",
      active: true,
      lastLogin: "2023-09-05",
    },
  ]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast.success(`User role updated to ${newRole}`);
  };

  const handleUserStatusChange = (userId: string, active: boolean) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, active } : user
      )
    );
    toast.success(`User status updated to ${active ? 'active' : 'inactive'}`);
  };

  const handleInviteUser = (userData: InviteUserFormValues) => {
    // Generate a random ID for the new user
    const newUserId = Math.random().toString(36).substring(2, 9);
    
    // Create a new user object
    const newUser: User = {
      id: newUserId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      active: true,
      lastLogin: "Never",
    };
    
    // Add the new user to the users array
    setUsers([...users, newUser]);
  };

  return {
    users,
    handleRoleChange,
    handleUserStatusChange,
    handleInviteUser
  };
}
