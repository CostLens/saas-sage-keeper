
export interface HrmsUser {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  position: string;
  join_date: string;
  exit_date?: string | null;
  status: 'active' | 'terminated' | 'on_leave';
  created_at: string;
  updated_at: string;
  manager_id?: string | null;
}

export interface EmployeeStatus {
  status: 'active' | 'terminated' | 'on_leave';
  exit_date: string | null;
  join_date: string;
}

export interface OnboardingTask {
  id: string;
  employee_id: string;
  saas_id: string;
  saas_name: string;
  task_type: 'onboarding' | 'offboarding';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  completed_at: string | null;
  assigned_to: string | null;
  priority: 'low' | 'medium' | 'high';
  notes: string | null;
}
