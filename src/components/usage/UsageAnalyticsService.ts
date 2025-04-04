
import { SaaSData } from "@/lib/mockData";
import { format } from "date-fns";
import { toast } from "sonner";

export const exportUsageReport = (data: SaaSData[]) => {
  const headers = ["Application", "Total Licenses", "Active Users", "Utilization Rate", "Renewal Date", "Cost/Month"];
  const csvRows = data.map(app => [
    app.name,
    app.usage.totalLicenses || 0,
    app.usage.activeUsers,
    app.usage.totalLicenses ? Math.round((app.usage.activeUsers / app.usage.totalLicenses) * 100) + "%" : "N/A",
    app.renewalDate,
    "$" + app.price
  ]);
  
  const csvContent = [headers.join(","), ...csvRows.map(row => row.join(","))].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `usage-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Usage report exported successfully");
};
