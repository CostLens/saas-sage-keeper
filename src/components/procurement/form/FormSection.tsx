
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface FormSectionProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  children: React.ReactNode;
}

export function FormSection({ form, name, label, children }: FormSectionProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{React.cloneElement(children as React.ReactElement, { ...field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
