import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import UploadDocuments from "../pages/Documents/Documents";
import Validation from "../pages/Validation/Validation";
import ValidatedData from "../pages/Documents/ValidatedData";
import Assistant from "../pages/Assistant/Assistant";
import Reports from "../pages/Reports/Reports";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<UploadDocuments />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/validated" element={<ValidatedData />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;