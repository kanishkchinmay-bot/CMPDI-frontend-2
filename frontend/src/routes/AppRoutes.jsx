import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import UploadDocuments from "../pages/Documents/Documents";
import Validation from "../pages/Validation/Validation";
import ValidatedData from "../pages/Documents/ValidatedData";
import Analytics from "../pages/Analytics/Analytics";
import Assistant from "../pages/Assistant/Assistant";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<UploadDocuments />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/validated" element={<ValidatedData />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;