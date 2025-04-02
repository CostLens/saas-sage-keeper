
import { z } from "zod";

export const formSchema = z.object({
  applicationName: z.string().min(2, "Application name is required"),
  vendor: z.string().min(2, "Vendor name is required"),
  department: z.string().min(1, "Department is required"),
  priority: z.string().min(1, "Priority is required"),
  annualCost: z.string().min(1, "Annual cost is required"),
  approver: z.string().min(1, "Approver is required"),
  businessJustification: z.string().min(10, "Please provide a detailed business justification"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms to submit this form",
  }),
});

export type ProcurementFormValues = z.infer<typeof formSchema>;

export const defaultValues: ProcurementFormValues = {
  applicationName: "",
  vendor: "",
  department: "",
  priority: "",
  annualCost: "",
  approver: "",
  businessJustification: "",
  acceptTerms: false,
};
