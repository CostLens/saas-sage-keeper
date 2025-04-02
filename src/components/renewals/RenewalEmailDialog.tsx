
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Mail, Send } from "lucide-react";
import { SaaSData } from "@/lib/mockData";
import { calculateRecommendation } from "./LicenseRecommendation";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface RenewalEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: SaaSData;
}

export function RenewalEmailDialog({ open, onOpenChange, contract }: RenewalEmailDialogProps) {
  const [recipient, setRecipient] = useState("vendor@example.com");
  const [cc, setCC] = useState("finance@yourcompany.com");
  const [subject, setSubject] = useState(`${contract.name} Contract Renewal Discussion`);
  const [template, setTemplate] = useState("negotiation");

  const recommendation = calculateRecommendation(contract);
  
  // Generate email content based on template and contract data
  const generateEmailContent = () => {
    const renewalDate = new Date(contract.renewalDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const companyName = "Your Company";
    const currentPrice = formatCurrency(contract.price);
    
    switch(template) {
      case "negotiation":
        return `Dear ${contract.name} Team,

I hope this email finds you well. I'm reaching out regarding our upcoming contract renewal for ${contract.name}, which is set to renew on ${renewalDate}.

As we prepare for this renewal, I'd like to discuss some opportunities to optimize our partnership:

${recommendation?.action === "Reduce" ? 
`• License Optimization: Our current utilization data shows we're using ${contract.usage.activeUsers} out of ${contract.usage.totalLicenses} licenses (${contract.usage.utilizationRate}%). We'd like to adjust our license count to better match our actual usage.

• Based on our analysis, we could reduce to ${recommendation.newLicenses} licenses, which would result in a more appropriate subscription level for our needs.` : 
`• While we're maintaining our current license count, we'd like to discuss pricing options that better align with our long-term commitment to ${contract.name}.`}

• We're interested in exploring multi-year options if favorable terms can be provided.

• Are there any new features or services that might be included in our renewal package?

I'm available to discuss these points in the coming week. Could you please provide some available times for a call?

Thank you for your continued support.

Best regards,
[Your Name]
${companyName}`;

      case "reduction":
        return `Dear ${contract.name} Team,

I hope this email finds you well. I'm writing regarding our upcoming renewal for ${contract.name}, scheduled for ${renewalDate}.

After reviewing our current usage patterns, we've identified that we're significantly over-licensed with our current arrangement:

• Current licenses: ${contract.usage.totalLicenses}
• Active users: ${contract.usage.activeUsers}
• Utilization rate: ${contract.usage.utilizationRate}%
• Current annual cost: ${currentPrice}

Based on this analysis, we need to reduce our license count to ${recommendation?.newLicenses || (contract.usage.activeUsers + 2)} to better align with our actual usage needs.

Could you please provide a revised quote with this adjusted license count? We'd also like to understand any potential volume discount options that might be available at this new tier.

I'm available to discuss this in more detail if needed.

Thank you for your assistance.

Best regards,
[Your Name]
${companyName}`;

      case "renewal":
      default:
        return `Dear ${contract.name} Team,

I hope this email finds you well. I'm reaching out regarding our upcoming renewal for ${contract.name}, which is set to renew on ${renewalDate}.

We value our partnership and would like to process this renewal smoothly. Could you please send us the following information:

1. Current renewal quote for our existing subscription
2. Any new features or updates included in this renewal
3. Payment options and terms available

Please direct the renewal information to our procurement team CC'd on this email.

Thank you for your continued support.

Best regards,
[Your Name]
${companyName}`;
    }
  };
  
  const emailContent = generateEmailContent();
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(emailContent);
    toast.success("Email content copied to clipboard");
  };
  
  const handleSendEmail = () => {
    toast.success(`Email drafted for ${contract.name} renewal`, {
      description: "Opening in your default email client"
    });
    
    // Create a mailto URL
    const mailtoUrl = `mailto:${recipient}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    
    // Open the default email client
    window.open(mailtoUrl, '_blank');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Draft Renewal Email for {contract.name}
          </DialogTitle>
          <DialogDescription>
            Preview and customize the email before sending or copying to your clipboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <Label htmlFor="recipient">To</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                value={cc}
                onChange={(e) => setCC(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="template">Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renewal">Standard Renewal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="reduction">License Reduction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">Email Content</Label>
            <Textarea
              id="content"
              value={emailContent}
              className="min-h-[300px] font-mono text-sm"
              readOnly
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy to Clipboard
          </Button>
          <Button onClick={handleSendEmail}>
            <Send className="h-4 w-4 mr-2" />
            Open in Email Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
