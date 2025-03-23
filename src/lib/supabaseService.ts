
import { supabase } from "@/integrations/supabase/client";
import { 
  SaasApplication, 
  Obligation, 
  Contract, 
  Invoice, 
  UsageStatistic, 
  PaymentHistory,
  SaasApplicationInsert,
  ObligationInsert,
  ContractInsert,
  InvoiceInsert,
  UsageStatisticInsert,
  PaymentHistoryInsert
} from "@/types/supabase";

// SaaS Applications
export const getSaasApplications = async (): Promise<SaasApplication[]> => {
  const { data, error } = await supabase
    .from('saas_applications')
    .select('*');
  
  if (error) {
    console.error('Error fetching SaaS applications:', error);
    throw error;
  }
  
  return data || [];
};

export const createSaasApplication = async (saas: SaasApplicationInsert): Promise<SaasApplication> => {
  const { data, error } = await supabase
    .from('saas_applications')
    .insert(saas)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating SaaS application:', error);
    throw error;
  }
  
  return data;
};

// Obligations
export const getObligations = async (): Promise<Obligation[]> => {
  const { data, error } = await supabase
    .from('obligations')
    .select('*');
  
  if (error) {
    console.error('Error fetching obligations:', error);
    throw error;
  }
  
  return data || [];
};

// Contracts
export const getContracts = async (): Promise<Contract[]> => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*');
  
  if (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
  
  return data || [];
};

// Invoices
export const getInvoices = async (): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*');
  
  if (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
  
  return data || [];
};

// Usage Statistics
export const getUsageStatistics = async (): Promise<UsageStatistic[]> => {
  const { data, error } = await supabase
    .from('usage_statistics')
    .select('*');
  
  if (error) {
    console.error('Error fetching usage statistics:', error);
    throw error;
  }
  
  return data || [];
};

// Payment History
export const getPaymentHistory = async (): Promise<PaymentHistory[]> => {
  const { data, error } = await supabase
    .from('payment_history')
    .select('*');
  
  if (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
  
  return data || [];
};
