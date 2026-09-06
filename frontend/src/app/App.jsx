import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layout/AppShell';

import Dashboard from '../pages/dashboard/Dashboard';
import Documents from '../pages/documents/Documents';
import HumanReview from '../pages/review/HumanReview';
import ValidatedDataTable from '../pages/records/ValidatedDataTable';
import Analytics from '../pages/analytics/Analytics';
import Validation from '../pages/validation/Validation';
import Reports from '../pages/reports/Reports';
import Assistant from '../pages/assistant/Assistant';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="review" element={<HumanReview />} />
        <Route path="records" element={<ValidatedDataTable />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="validation" element={<Validation />} />
        <Route path="reports" element={<Reports />} />
        <Route path="assistant" element={<Assistant />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
