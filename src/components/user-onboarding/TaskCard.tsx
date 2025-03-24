
import React from "react";
import { OnboardingTask } from "@/types/hrms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HrmsUser } from "@/types/hrms";
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";

interface TaskCardProps {
  task: OnboardingTask;
  user?: HrmsUser;
  onUpdateStatus: (taskId: string, newStatus: "pending" | "in_progress" | "completed" | "failed") => void;
}

export function TaskCard({ task, user, onUpdateStatus }: TaskCardProps) {
  return (
    <div key={task.id} className="border rounded-md p-3 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{user?.full_name || task.employee_id}</h4>
          <p className="text-sm text-muted-foreground">{task.saas_name}</p>
        </div>
        <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}>
          {task.priority}
        </Badge>
      </div>
      {task.notes && (
        <p className="text-xs text-muted-foreground">{task.notes}</p>
      )}
      <div className="flex justify-end space-x-2 pt-2">
        {task.status === "pending" && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onUpdateStatus(task.id, "in_progress")}
          >
            Start
          </Button>
        )}
        {task.status === "in_progress" && (
          <>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUpdateStatus(task.id, "failed")}
            >
              Failed
            </Button>
            <Button 
              size="sm"
              onClick={() => onUpdateStatus(task.id, "completed")}
            >
              Complete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function CompletedTaskCard({ task, user }: Omit<TaskCardProps, 'onUpdateStatus'>) {
  return (
    <div key={task.id} className="border rounded-md p-3 space-y-2 opacity-80">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{user?.full_name || task.employee_id}</h4>
          <p className="text-sm text-muted-foreground">{task.saas_name}</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Completed
        </Badge>
      </div>
      {task.completed_at && (
        <p className="text-xs text-muted-foreground">
          Completed on {new Date(task.completed_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  switch(status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <AlertCircle className="h-3.5 w-3.5 mr-1" />
          Pending
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          Completed
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3.5 w-3.5 mr-1" />
          Failed
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}
