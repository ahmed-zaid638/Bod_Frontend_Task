import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex  min-h-screen bg-amber-300">
      <Sidebar className="hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <main className="flex-1 p-3 md:p-6 bg-gray-100 ml-0 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
