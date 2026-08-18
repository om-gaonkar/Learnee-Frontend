import { Outlet } from "react-router";
import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-secondary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
