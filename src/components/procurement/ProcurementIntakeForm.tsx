
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formSchema, defaultValues, ProcurementFormValues } from "./form/procurementFormSchema";
import { ProcurementFormFields } from "./form/ProcurementFormFields";
import { BusinessJustificationField } from "./form/BusinessJustificationField";
import { TermsAcceptanceField } from "./form/TermsAcceptanceField";

interface ProcurementIntakeFormProps {
  onSubmitSuccess?: () => void;
}

export function ProcurementIntakeForm({ onSubmitSuccess }: ProcurementIntakeFormProps) {
  const form = useForm<ProcurementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: ProcurementFormValues) => {
    // Here you would typically submit to an API
    console.log(values);
    
    // Show success message
    toast.success("Procurement request submitted successfully", {
      description: "Your request has been sent to the procurement team for review.",
    });
    
    // Reset form
    form.reset();
    
    // Call success callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>New Procurement Request</CardTitle>
        <CardDescription>
          Fill out this form to request a new software or service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ProcurementFormFields form={form} />
            
            <BusinessJustificationField form={form} />
            
            <TermsAcceptanceField form={form} />
            
            <div className="flex justify-end">
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
