
import { supabase } from "@/integrations/supabase/client";
import { EmployeeStatus, HrmsUser, OnboardingTask } from "@/types/hrms";

// Helper function to validate status
const validateEmployeeStatus = (status: string): 'active' | 'terminated' | 'on_leave' => {
  if (status === 'active' || status === 'terminated' || status === 'on_leave') {
    return status;
  }
  console.warn(`Invalid status value: ${status}, defaulting to 'active'`);
  return 'active';
};

// Fetch users from HRMS integration
export const getHrmsUsers = async (): Promise<HrmsUser[]> => {
  const { data, error } = await supabase
    .from('hrms_users')
    .select('*');
  
  if (error) {
    console.error('Error fetching HRMS users:', error);
    throw error;
  }
  
  // Map and validate the data to match our HrmsUser type
  return (data || []).map(user => ({
    ...user,
    status: validateEmployeeStatus(user.status)
  }));
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
  
  // Convert string status to our enum type
  return data ? {
    ...data,
    status: validateEmployeeStatus(data.status)
  } : null;
};

// Get all user onboarding/offboarding tasks
export const getUserOnboardingTasks = async (employeeId: string): Promise<OnboardingTask[]> => {
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
