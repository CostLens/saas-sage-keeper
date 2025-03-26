
import { HrmsUser } from "@/types/hrms";

// Mock user tool mappings data with more complete mappings
export const mockUserToolMappings = [
  { userId: "EMP001", toolIds: ["salesforce1", "slack1", "asana1"] },
  { userId: "EMP002", toolIds: ["hubspot1", "zoom1"] },
  { userId: "EMP003", toolIds: ["salesforce1", "hubspot1", "slack1", "zoom1"] },
  { userId: "EMP004", toolIds: ["zoom1", "salesforce1"] },
  { userId: "EMP005", toolIds: ["salesforce1", "hubspot1"] },
  { userId: "EMP006", toolIds: ["salesforce1", "slack1", "zoom1"] },
  { userId: "EMP007", toolIds: ["hubspot1", "zoom1", "slack1"] },
  { userId: "EMP008", toolIds: ["slack1", "asana1"] },
  { userId: "EMP009", toolIds: ["salesforce1"] },
  { userId: "EMP010", toolIds: ["salesforce1", "hubspot1", "slack1", "zoom1", "asana1"] },
  { userId: "EMP011", toolIds: ["salesforce1", "zoom1"] },
  { userId: "EMP012", toolIds: ["slack1", "hubspot1", "asana1"] },
];

// Additional users data with proper status types
export const additionalUsers: HrmsUser[] = [
  {
    id: "dummy1",
    employee_id: "EMP006",
    full_name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "active",
    join_date: "2022-05-15",
    created_at: "2022-05-15T00:00:00.000Z",
    updated_at: "2022-05-15T00:00:00.000Z"
  },
  {
    id: "dummy2",
    employee_id: "EMP007",
    full_name: "William Taylor",
    email: "william.taylor@example.com",
    department: "Engineering",
    position: "Software Engineer",
    status: "active",
    join_date: "2022-06-01",
    created_at: "2022-06-01T00:00:00.000Z",
    updated_at: "2022-06-01T00:00:00.000Z"
  },
  {
    id: "dummy3",
    employee_id: "EMP008",
    full_name: "Emma Brown",
    email: "emma.brown@example.com",
    department: "HR",
    position: "HR Coordinator",
    status: "active",
    join_date: "2022-07-12",
    created_at: "2022-07-12T00:00:00.000Z",
    updated_at: "2022-07-12T00:00:00.000Z"
  },
  {
    id: "dummy4",
    employee_id: "EMP009",
    full_name: "James Wilson",
    email: "james.wilson@example.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "active",
    join_date: "2022-08-03",
    created_at: "2022-08-03T00:00:00.000Z",
    updated_at: "2022-08-03T00:00:00.000Z"
  },
  {
    id: "dummy5",
    employee_id: "EMP010",
    full_name: "Sophia Davis",
    email: "sophia.davis@example.com",
    department: "Product",
    position: "Product Manager",
    status: "active",
    join_date: "2022-09-20",
    created_at: "2022-09-20T00:00:00.000Z",
    updated_at: "2022-09-20T00:00:00.000Z"
  },
  {
    id: "dummy6",
    employee_id: "EMP011",
    full_name: "Lucas Garcia",
    email: "lucas.garcia@example.com",
    department: "Sales",
    position: "Sales Representative",
    status: "terminated",
    join_date: "2021-04-15",
    exit_date: "2023-01-10",
    created_at: "2021-04-15T00:00:00.000Z",
    updated_at: "2023-01-10T00:00:00.000Z"
  },
  {
    id: "dummy7",
    employee_id: "EMP012",
    full_name: "Mia Martinez",
    email: "mia.martinez@example.com",
    department: "Customer Support",
    position: "Customer Support Lead",
    status: "on_leave",
    join_date: "2021-10-05",
    created_at: "2021-10-05T00:00:00.000Z",
    updated_at: "2021-10-05T00:00:00.000Z"
  }
];
