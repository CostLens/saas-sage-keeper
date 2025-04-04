
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        <DashboardContent />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
