
import { useState } from "react";
import { toast } from "sonner";
import { User, UserRole } from "./types";

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

  const handleInviteUser = () => {
    toast.info("Invite user functionality not implemented in this demo");
  };

  return {
    users,
    handleRoleChange,
    handleUserStatusChange,
    handleInviteUser
  };
}
