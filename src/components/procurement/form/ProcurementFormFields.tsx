
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormSection } from "./FormSection";
import { ProcurementFormValues } from "./procurementFormSchema";

interface ProcurementFormFieldsProps {
  form: UseFormReturn<ProcurementFormValues>;
}

export function ProcurementFormFields({ form }: ProcurementFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormSection form={form} name="applicationName" label="Application Name">
        <Input placeholder="e.g. Slack, Microsoft 365" />
      </FormSection>
      
      <FormSection form={form} name="vendor" label="Vendor">
        <Input placeholder="e.g. Slack Technologies" />
      </FormSection>
      
      <FormSection form={form} name="department" label="Department">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
          </SelectContent>
        </Select>
      </FormSection>
      
      <FormSection form={form} name="priority" label="Priority">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </FormSection>
      
      <FormSection form={form} name="annualCost" label="Annual Cost (Estimated)">
        <Input placeholder="$" />
      </FormSection>
      
      <FormSection form={form} name="approver" label="Approver">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select approver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john.smith">John Smith (IT Director)</SelectItem>
            <SelectItem value="jane.doe">Jane Doe (Finance Director)</SelectItem>
            <SelectItem value="mark.wilson">Mark Wilson (CTO)</SelectItem>
            <SelectItem value="sarah.johnson">Sarah Johnson (COO)</SelectItem>
            <SelectItem value="david.williams">David Williams (CEO)</SelectItem>
          </SelectContent>
        </Select>
      </FormSection>
    </div>
  );
}
