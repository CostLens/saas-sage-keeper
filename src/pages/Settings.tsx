
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between mt-16">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
            </div>
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
