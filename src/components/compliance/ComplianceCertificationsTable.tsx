
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
import { Button } from "@/components/ui/button";
import { FileCheck, Download, ShieldCheck, AlertTriangle } from "lucide-react";

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

  // Function to export the compliance data as CSV
  const exportToCSV = () => {
    // Create CSV header
    const headers = ['Application', 'HIPAA', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2', 'PCI DSS', 'Risk Level'];
    
    // Map data to CSV rows, only showing "Certified" values
    const rows = filteredData.map(item => {
      const row = [item.name];
      ['HIPAA', 'GDPR', 'CCPA', 'ISO 27001', 'SOC 2', 'PCI DSS'].forEach(certName => {
        const cert = item.certifications.find(c => c.name === certName);
        row.push(cert && cert.status === "Certified" ? "Yes" : "No");
      });
      row.push(calculateRiskLevel(item.certifications));
      return row;
    });
    
    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'compliance_certifications.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate risk level based on certifications
  const calculateRiskLevel = (certifications: ComplianceData['certifications']) => {
    const certifiedCount = certifications.filter(cert => cert.status === "Certified").length;
    const totalCount = certifications.length;
    
    if (certifiedCount === 0) return "Critical";
    if (certifiedCount / totalCount < 0.3) return "High";
    if (certifiedCount / totalCount < 0.7) return "Medium";
    return "Low";
  };

  // Get badge variant and icon based on risk level
  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "Critical":
        return { variant: "destructive" as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      case "High":
        return { variant: "destructive" as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      case "Medium":
        return { variant: "secondary" as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      case "Low":
        return { variant: "outline" as const, icon: <ShieldCheck className="h-3 w-3 mr-1" /> };
      default:
        return { variant: "outline" as const, icon: <ShieldCheck className="h-3 w-3 mr-1" /> };
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Compliance Certifications
          </CardTitle>
          <Button variant="outline" size="sm" onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
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
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const riskLevel = calculateRiskLevel(item.certifications);
                const { variant: riskVariant, icon: riskIcon } = getRiskBadge(riskLevel);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    {["HIPAA", "GDPR", "CCPA", "ISO 27001", "SOC 2", "PCI DSS"].map((certName) => {
                      const cert = item.certifications.find(c => c.name === certName);
                      return (
                        <TableCell key={certName}>
                          {cert && cert.status === "Certified" ? (
                            <Badge className="bg-green-500">
                              <ShieldCheck className="h-3 w-3 mr-1" /> Certified
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Badge variant={riskVariant}>
                        {riskIcon} {riskLevel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
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
