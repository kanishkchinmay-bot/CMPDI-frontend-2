import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppProvider } from "../context/AppContext";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import NewAnalysisModal from "../components/modals/NewAnalysisModal";
import FilterModal from "../components/modals/FilterModal";
import ExportModal from "../components/modals/ExportModal";

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newAnalysisOpen, setNewAnalysisOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchQuery = (query) => {
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <AppProvider>
      <div className="flex min-h-screen bg-[#E8EDF5] text-[#1E293B] antialiased">
        <Sidebar
          onNewAnalysis={() => setNewAnalysisOpen(true)}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <Navbar
            onOpenMenu={() => setMobileMenuOpen(true)}
            onSearchQuery={handleSearchQuery}
            onOpenSettings={() => navigate("/settings")}
          />

          <main className="flex-1 p-5 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <Outlet
              context={{
                onOpenNewAnalysis: () => setNewAnalysisOpen(true),
                onOpenFilter: () => setFilterModalOpen(true),
                onOpenExport: () => setExportModalOpen(true),
              }}
            />
          </main>
        </div>

        <NewAnalysisModal
          isOpen={newAnalysisOpen}
          onClose={() => setNewAnalysisOpen(false)}
          onComplete={() => {}}
        />
        <FilterModal
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={() => {}}
        />
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
        />
      </div>
    </AppProvider>
  );
};

export default MainLayout;