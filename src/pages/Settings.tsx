
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-6 space-y-8 overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>

          <SettingsTabs />
        </main>
      </div>
    </div>
  );
};

export default Settings;
