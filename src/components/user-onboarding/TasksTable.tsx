
import React from "react";
import { OnboardingTask } from "@/types/hrms";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HrmsUser } from "@/types/hrms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./TaskCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TasksTableProps {
  tasks: OnboardingTask[];
  taskType: "onboarding" | "offboarding";
  isLoadingTasks: boolean;
  getUserById: (employeeId: string) => HrmsUser | undefined;
  onUpdateTaskStatus: (taskId: string, newStatus: "pending" | "in_progress" | "completed" | "failed") => void;
}

export function TasksTable({ tasks, taskType, isLoadingTasks, getUserById, onUpdateTaskStatus }: TasksTableProps) {
  const filteredTasks = tasks?.filter(t => t.task_type === taskType) || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All {taskType === "onboarding" ? "Onboarding" : "Offboarding"} Tasks</CardTitle>
        <CardDescription>View and manage all {taskType === "onboarding" ? "onboarding" : "offboarding"} tasks</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingTasks ? (
          <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No {taskType} tasks found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>SaaS Tool</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Completed At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map(task => {
                const user = getUserById(task.employee_id);
                return (
                  <TableRow key={task.id}>
                    <TableCell>{user?.full_name || task.employee_id}</TableCell>
                    <TableCell>{task.saas_name}</TableCell>
                    <TableCell>
                      <StatusBadge status={task.status} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {task.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => onUpdateTaskStatus(task.id, "in_progress")}>
                            Start
                          </Button>
                        )}
                        {task.status === "in_progress" && (
                          <Button size="sm" variant="outline" onClick={() => onUpdateTaskStatus(task.id, "completed")}>
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
