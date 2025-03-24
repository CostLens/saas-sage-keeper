export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contracts: {
        Row: {
          created_at: string
          end_date: string
          file_url: string | null
          id: string
          saas_id: string
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string
          end_date: string
          file_url?: string | null
          id?: string
          saas_id: string
          start_date: string
          title: string
        }
        Update: {
          created_at?: string
          end_date?: string
          file_url?: string | null
          id?: string
          saas_id?: string
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      hrms_users: {
        Row: {
          created_at: string
          department: string
          email: string
          employee_id: string
          exit_date: string | null
          full_name: string
          id: string
          join_date: string
          manager_id: string | null
          position: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          email: string
          employee_id: string
          exit_date?: string | null
          full_name: string
          id?: string
          join_date: string
          manager_id?: string | null
          position: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          email?: string
          employee_id?: string
          exit_date?: string | null
          full_name?: string
          id?: string
          join_date?: string
          manager_id?: string | null
          position?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hrms_users_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "hrms_users"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          file_url: string | null
          id: string
          invoice_date: string
          saas_id: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          file_url?: string | null
          id?: string
          invoice_date: string
          saas_id: string
          status: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          file_url?: string | null
          id?: string
          invoice_date?: string
          saas_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      obligations: {
        Row: {
          assignee: string | null
          created_at: string
          description: string | null
          due_date: string
          id: string
          impact: string | null
          priority: string
          saas_id: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          impact?: string | null
          priority: string
          saas_id: string
          status: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          assignee?: string | null
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          impact?: string | null
          priority?: string
          saas_id?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "obligations_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_date: string
          saas_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_date: string
          saas_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_date?: string
          saas_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      saas_applications: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          price: number
          pricing_terms: string
          renewal_date: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: number
          pricing_terms: string
          renewal_date?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: number
          pricing_terms?: string
          renewal_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      usage_statistics: {
        Row: {
          active_users: number
          created_at: string
          id: string
          saas_id: string
          status: string
          total_licenses: number | null
          updated_at: string
          utilization_rate: number
        }
        Insert: {
          active_users: number
          created_at?: string
          id?: string
          saas_id: string
          status: string
          total_licenses?: number | null
          updated_at?: string
          utilization_rate: number
        }
        Update: {
          active_users?: number
          created_at?: string
          id?: string
          saas_id?: string
          status?: string
          total_licenses?: number | null
          updated_at?: string
          utilization_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "usage_statistics_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_onboarding_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          employee_id: string
          id: string
          notes: string | null
          priority: string
          saas_id: string
          saas_name: string
          status: string
          task_type: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          employee_id: string
          id?: string
          notes?: string | null
          priority: string
          saas_id: string
          saas_name: string
          status: string
          task_type: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          notes?: string | null
          priority?: string
          saas_id?: string
          saas_name?: string
          status?: string
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_onboarding_tasks_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "hrms_users"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "user_onboarding_tasks_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
