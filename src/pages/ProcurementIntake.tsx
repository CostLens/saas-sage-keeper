
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ProcurementIntakeContent } from "@/components/procurement/ProcurementIntakeContent";

function ProcurementIntake() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <Header title="Procurement Intake" />
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <ProcurementIntakeContent />
        </main>
      </div>
    </div>
  );
}

export default ProcurementIntake;
