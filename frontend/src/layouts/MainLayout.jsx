import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-[#E8EDF5] text-[#1E293B] antialiased">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar onOpenMenu={() => setMobileMenuOpen(true)} />

          <main className="flex-1 p-5 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default MainLayout;