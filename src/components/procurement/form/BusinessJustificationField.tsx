
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface BusinessJustificationFieldProps {
  form: UseFormReturn<any>;
}

export function BusinessJustificationField({ form }: BusinessJustificationFieldProps) {
  return (
    <FormField
      control={form.control}
      name="businessJustification"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Justification</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Please explain why this software or service is needed and how it will benefit the organization..." 
              className="min-h-[120px]"
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Include specific details about how this will improve productivity or address a business need.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
