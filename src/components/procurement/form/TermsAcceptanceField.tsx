
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";

interface TermsAcceptanceFieldProps {
  form: UseFormReturn<any>;
}

export function TermsAcceptanceField({ form }: TermsAcceptanceFieldProps) {
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I understand that all software requests must go through an IT security review
            </FormLabel>
            <FormDescription>
              By checking this box, you confirm that you've read and agree to the procurement policy.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
