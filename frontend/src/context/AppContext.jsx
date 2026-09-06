import React, { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────────
   MOCK seed data – simulates already-processed
   documents so the UI is never empty on first load
───────────────────────────────────────────── */
const SEED_RECORDS = [
  {
    id: "REC-001",
    docId: "DOC-001",
    docName: "Annual_Production_Report_2022.pdf",
    project: "Jharia Block IV",
    year: "2022",
    production: "4.82 MT",
    reserve: "128.5 MT",
    status: "validated",
    confidence: 97,
    sourcePage: 14,
    sourceSnippet:
      "Total coal production from Jharia Block IV during FY 2021-22 amounted to 4.82 million tonnes against a target of 4.5 MT…",
    warnings: [],
  },
  {
    id: "REC-002",
    docId: "DOC-001",
    docName: "Annual_Production_Report_2022.pdf",
    project: "North Karanpura East",
    year: "2022",
    production: "2.14 MT",
    reserve: "56.3 MT",
    status: "validated",
    confidence: 93,
    sourcePage: 22,
    sourceSnippet:
      "North Karanpura East registered a production of 2.14 MT, with geological reserves estimated at 56.3 MT…",
    warnings: [],
  },
  {
    id: "REC-003",
    docId: "DOC-002",
    docName: "Geological_Survey_Raniganj_Q3.pdf",
    project: "Raniganj South Extension",
    year: "2023",
    production: "3.67 MT",
    reserve: "94.7 MT",
    status: "pending",
    confidence: 72,
    sourcePage: 8,
    sourceSnippet:
      "Estimated production for Raniganj South Extension is approximately 3.67 MT, however reserve figures are subject to revision…",
    warnings: ["Low confidence on Reserve value (72%)", "Production figure may include trial blast tonnage"],
  },
  {
    id: "REC-004",
    docId: "DOC-002",
    docName: "Geological_Survey_Raniganj_Q3.pdf",
    project: "Bokaro Seam B-VI",
    year: "2023",
    production: "1.92 MT",
    reserve: "38.0 MT",
    status: "pending",
    confidence: 85,
    sourcePage: 17,
    sourceSnippet:
      "Bokaro Seam B-VI production in Q3 2023 stood at 1.92 MT with proven reserves of 38 MT based on exploration drilling…",
    warnings: ["Reserve value inferred from limited boreholes"],
  },
  {
    id: "REC-005",
    docId: "DOC-003",
    docName: "Singrauli_MinePlan_2021.xlsx",
    project: "Singrauli Moher Basin",
    year: "2021",
    production: "6.10 MT",
    reserve: "210.4 MT",
    status: "validated",
    confidence: 99,
    sourcePage: 3,
    sourceSnippet:
      "Sheet: Production Summary. Singrauli Moher Basin FY2021 production: 6,100,000 tonnes. Total geological reserves: 210.4 MT.",
    warnings: [],
  },
];

const SEED_DOCUMENTS = [
  {
    id: "DOC-001",
    name: "Annual_Production_Report_2022.pdf",
    type: "PDF",
    size: "4.2 MB",
    uploadedAt: "Sep 04, 2026 · 10:32 AM",
    status: "completed",
    pages: 38,
    recordsExtracted: 2,
  },
  {
    id: "DOC-002",
    name: "Geological_Survey_Raniganj_Q3.pdf",
    type: "PDF",
    size: "2.8 MB",
    uploadedAt: "Sep 03, 2026 · 3:15 PM",
    status: "completed",
    pages: 24,
    recordsExtracted: 2,
  },
  {
    id: "DOC-003",
    name: "Singrauli_MinePlan_2021.xlsx",
    type: "Excel",
    size: "1.1 MB",
    uploadedAt: "Sep 02, 2026 · 9:00 AM",
    status: "completed",
    pages: 5,
    recordsExtracted: 1,
  },
];

/* ─────────────────────────────────────────────
   Context
───────────────────────────────────────────── */
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [documents, setDocuments] = useState(SEED_DOCUMENTS);
  const [records, setRecords] = useState(SEED_RECORDS);

  // Derived counts
  const uploadedCount = documents.length;
  const pendingCount = records.filter((r) => r.status === "pending").length;
  const validatedCount = records.filter((r) => r.status === "validated").length;
  const conflictCount = records.filter((r) => r.confidence < 80 && r.status === "pending").length;

  // Upload a new document (mock extraction after 2s)
  const uploadDocument = (file) => {
    const newDoc = {
      id: `DOC-${Date.now()}`,
      name: file.name,
      type: file.name.endsWith(".xlsx") || file.name.endsWith(".xls") ? "Excel"
            : file.name.endsWith(".pdf") ? "PDF" : "Image",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      status: "processing",
      pages: Math.floor(Math.random() * 30) + 5,
      recordsExtracted: 0,
    };
    setDocuments((prev) => [newDoc, ...prev]);

    // Simulate extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        const extracted = Math.floor(Math.random() * 3) + 1;
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDoc.id
              ? { ...d, status: "completed", recordsExtracted: extracted }
              : d
          )
        );
        // Add pending records for review
        const newRecords = Array.from({ length: extracted }, (_, i) => ({
          id: `REC-${Date.now()}-${i}`,
          docId: newDoc.id,
          docName: newDoc.name,
          project: ["Jharia New Seam", "Bokaro Deep", "Raniganj West"][i % 3],
          year: "2024",
          production: `${(Math.random() * 5 + 0.5).toFixed(2)} MT`,
          reserve: `${(Math.random() * 100 + 20).toFixed(1)} MT`,
          status: "pending",
          confidence: Math.floor(Math.random() * 25) + 70,
          sourcePage: Math.floor(Math.random() * 30) + 1,
          sourceSnippet: `Extracted from ${newDoc.name}. Production and reserve figures obtained from table on page ${Math.floor(Math.random() * 30) + 1}.`,
          warnings: Math.random() > 0.5 ? ["Auto-extracted value — please verify"] : [],
        }));
        setRecords((prev) => [...prev, ...newRecords]);
        resolve({ doc: newDoc, records: newRecords });
      }, 2500);
    });
  };

  // Approve a record
  const approveRecord = (id) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "validated" } : r))
    );
  };

  // Reject a record
  const rejectRecord = (id) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  // Edit a record's fields
  const editRecord = (id, updates) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, status: "validated", warnings: [] } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
        documents,
        records,
        uploadedCount,
        pendingCount,
        validatedCount,
        conflictCount,
        uploadDocument,
        approveRecord,
        rejectRecord,
        editRecord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};

export default AppContext;
