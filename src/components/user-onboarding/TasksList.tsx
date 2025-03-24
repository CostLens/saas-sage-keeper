
import React from "react";
import { OnboardingTask } from "@/types/hrms";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HrmsUser } from "@/types/hrms";
import { TaskCard, CompletedTaskCard } from "./TaskCard";

interface TasksListProps {
  pendingTasks: OnboardingTask[];
  inProgressTasks: OnboardingTask[];
  completedTasks: OnboardingTask[];
  isLoadingTasks: boolean;
  getUserById: (employeeId: string) => HrmsUser | undefined;
  onUpdateTaskStatus: (taskId: string, newStatus: "pending" | "in_progress" | "completed" | "failed") => void;
}

export function TasksList({ 
  pendingTasks, 
  inProgressTasks, 
  completedTasks, 
  isLoadingTasks, 
  getUserById, 
  onUpdateTaskStatus 
}: TasksListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Pending</CardTitle>
          <CardDescription>{pendingTasks.length} tasks awaiting action</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTasks ? (
            <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
          ) : pendingTasks.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No pending tasks</div>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  user={getUserById(task.employee_id)}
                  onUpdateStatus={onUpdateTaskStatus}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>In Progress</CardTitle>
          <CardDescription>{inProgressTasks.length} tasks in progress</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTasks ? (
            <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
          ) : inProgressTasks.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No tasks in progress</div>
          ) : (
            <div className="space-y-4">
              {inProgressTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  user={getUserById(task.employee_id)}
                  onUpdateStatus={onUpdateTaskStatus}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Completed</CardTitle>
          <CardDescription>{completedTasks.length} tasks completed</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTasks ? (
            <div className="py-8 text-center text-muted-foreground">Loading tasks...</div>
          ) : completedTasks.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No completed tasks</div>
          ) : (
            <div className="space-y-4">
              {completedTasks.map(task => (
                <CompletedTaskCard 
                  key={task.id}
                  task={task}
                  user={getUserById(task.employee_id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
