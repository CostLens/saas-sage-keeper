
import { Database } from "@/integrations/supabase/types";

// Define types based on the generated Supabase types
export type SaasApplication = Database['public']['Tables']['saas_applications']['Row'];
export type Obligation = Database['public']['Tables']['obligations']['Row'];
export type Contract = Database['public']['Tables']['contracts']['Row'];
export type Invoice = Database['public']['Tables']['invoices']['Row'];
export type UsageStatistic = Database['public']['Tables']['usage_statistics']['Row'];
export type PaymentHistory = Database['public']['Tables']['payment_history']['Row'];

// Define insert types
export type SaasApplicationInsert = Database['public']['Tables']['saas_applications']['Insert'];
export type ObligationInsert = Database['public']['Tables']['obligations']['Insert'];
export type ContractInsert = Database['public']['Tables']['contracts']['Insert'];
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert'];
export type UsageStatisticInsert = Database['public']['Tables']['usage_statistics']['Insert'];
export type PaymentHistoryInsert = Database['public']['Tables']['payment_history']['Insert'];
