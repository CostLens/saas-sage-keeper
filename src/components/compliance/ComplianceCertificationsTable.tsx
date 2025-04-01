
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplianceData } from "@/hooks/useComplianceData";
import { Input } from "@/components/ui/input";
import { Shield, ShieldCheck, AlertTriangle, FileCheck } from "lucide-react";

interface ComplianceCertificationsTableProps {
  data: ComplianceData[];
}

export function ComplianceCertificationsTable({ data }: ComplianceCertificationsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.certifications.some(cert => 
      cert.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to render certification status badge
  const renderCertificationStatus = (status: "Certified" | "Pending" | "NotCompliant") => {
    switch (status) {
      case "Certified":
        return <Badge className="bg-green-500"><ShieldCheck className="h-3 w-3 mr-1" /> Certified</Badge>;
      case "Pending":
        return <Badge className="bg-amber-500"><AlertTriangle className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "NotCompliant":
        return <Badge variant="destructive"><Shield className="h-3 w-3 mr-1" /> Not Compliant</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          Compliance Certifications
        </CardTitle>
        <div className="pt-2">
          <Input 
            placeholder="Search applications or certifications..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>HIPAA</TableHead>
              <TableHead>GDPR</TableHead>
              <TableHead>CCPA</TableHead>
              <TableHead>ISO 27001</TableHead>
              <TableHead>SOC 2</TableHead>
              <TableHead>PCI DSS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  {["HIPAA", "GDPR", "CCPA", "ISO 27001", "SOC 2", "PCI DSS"].map((certName) => {
                    const cert = item.certifications.find(c => c.name === certName);
                    return (
                      <TableCell key={certName}>
                        {cert ? renderCertificationStatus(cert.status) : <Badge variant="outline">Not Applicable</Badge>}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No compliance data found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
