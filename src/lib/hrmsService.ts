
import { supabase } from "@/integrations/supabase/client";
import { EmployeeStatus, HrmsUser } from "@/types/hrms";

// Fetch users from HRMS integration
export const getHrmsUsers = async (): Promise<HrmsUser[]> => {
  const { data, error } = await supabase
    .from('hrms_users')
    .select('*');
  
  if (error) {
    console.error('Error fetching HRMS users:', error);
    throw error;
  }
  
  return data || [];
};

// Get employee status
export const getEmployeeStatus = async (employeeId: string): Promise<EmployeeStatus | null> => {
  const { data, error } = await supabase
    .from('hrms_users')
    .select('status, exit_date, join_date')
    .eq('employee_id', employeeId)
    .single();
  
  if (error) {
    console.error('Error fetching employee status:', error);
    return null;
  }
  
  return data || null;
};

// Get all user onboarding/offboarding tasks
export const getUserOnboardingTasks = async (employeeId: string) => {
  const { data, error } = await supabase
    .from('user_onboarding_tasks')
    .select('*')
    .eq('employee_id', employeeId);
  
  if (error) {
    console.error('Error fetching user onboarding tasks:', error);
    throw error;
  }
  
  return data || [];
};

// Create a new onboarding/offboarding task
export const createOnboardingTask = async (task: any) => {
  const { data, error } = await supabase
    .from('user_onboarding_tasks')
    .insert(task)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating onboarding task:', error);
    throw error;
  }
  
  return data;
};

// Update task status
export const updateTaskStatus = async (taskId: string, status: string) => {
  const { data, error } = await supabase
    .from('user_onboarding_tasks')
    .update({ status })
    .eq('id', taskId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
  
  return data;
};
