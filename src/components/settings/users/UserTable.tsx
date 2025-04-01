
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserRole } from "@/components/settings/users/types";
import { toast } from "sonner";
import { UserAvatar } from "./UserAvatar";
import { UserRoleSelect } from "./UserRoleSelect";
import { UserStatus } from "./UserStatus";
import { UserActionMenu } from "./UserActionMenu";
import { RevokeAccessDialog } from "./RevokeAccessDialog";

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: UserRole) => void;
  onStatusChange: (userId: string, active: boolean) => void;
}

export function UserTable({ users, onRoleChange, onStatusChange }: UserTableProps) {
  const [userToRevoke, setUserToRevoke] = React.useState<User | null>(null);
  
  const handleRevokeAccess = () => {
    if (userToRevoke) {
      onStatusChange(userToRevoke.id, false);
      toast.success(`Access revoked for ${userToRevoke.name}`);
      setUserToRevoke(null);
    }
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <UserAvatar name={user.name} email={user.email} />
                </TableCell>
                <TableCell>
                  <UserRoleSelect 
                    role={user.role} 
                    onRoleChange={(role) => onRoleChange(user.id, role)} 
                  />
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.lastLogin}</TableCell>
                <TableCell>
                  <UserStatus 
                    active={user.active} 
                    onStatusChange={(active) => onStatusChange(user.id, active)} 
                  />
                </TableCell>
                <TableCell className="text-right">
                  <UserActionMenu 
                    user={user} 
                    onRevokeAccess={setUserToRevoke} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RevokeAccessDialog 
        user={userToRevoke}
        open={!!userToRevoke}
        onOpenChange={() => setUserToRevoke(null)}
        onConfirm={handleRevokeAccess}
      />
    </>
  );
}
