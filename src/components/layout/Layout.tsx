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
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
