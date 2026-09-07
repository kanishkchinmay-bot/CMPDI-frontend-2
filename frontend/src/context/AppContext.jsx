import React, { createContext, useContext, useState } from "react";

/* ─────────────────────────────────────────────
   SEED DATA - Real CMPDI / Coal India documents
   reflecting the Version 1 Core Workflow
───────────────────────────────────────────── */
const INITIAL_DOCUMENTS = [
  {
    id: "DOC-001",
    name: "CMPDI_BCCL_Jharia_Coalfield_FY23.pdf",
    type: "PDF",
    size: "4.8 MB",
    uploadedAt: "Today, 09:20 AM",
    status: "Completed",
    pages: 28,
    recordsExtracted: 2,
  },
  {
    id: "DOC-002",
    name: "SECL_Gevra_Annual_2023.pdf",
    type: "PDF",
    size: "12.4 MB",
    uploadedAt: "Today, 08:45 AM",
    status: "Completed",
    pages: 64,
    recordsExtracted: 2,
  },
  {
    id: "DOC-003",
    name: "NCL_Singrauli_Block_B_Reserves.xlsx",
    type: "Excel",
    size: "1.8 MB",
    uploadedAt: "Today, 08:15 AM",
    status: "Completed",
    pages: 6,
    recordsExtracted: 1,
  },
  {
    id: "DOC-004",
    name: "ECL_Raniganj_Area_Survey_2023.pdf",
    type: "PDF",
    size: "6.2 MB",
    uploadedAt: "Yesterday",
    status: "Completed",
    pages: 32,
    recordsExtracted: 1,
  },
  {
    id: "DOC-005",
    name: "BCCL_Katras_Area_Annual_Production_2023.pdf",
    type: "PDF",
    size: "4.2 MB",
    uploadedAt: "Today, 07:30 AM",
    status: "Completed",
    pages: 18,
    recordsExtracted: 1,
  },
];

const INITIAL_RECORDS = [
  {
    id: "REC-001",
    docId: "DOC-001",
    docName: "CMPDI_BCCL_Jharia_Coalfield_FY23.pdf",
    project: "Jharia Seam IX/X Deep Mining",
    colliery: "Dhanbad Colliery",
    subsidiary: "BCCL",
    year: "FY 2022-23",
    production: "4.85 MT",
    productionVal: 4.85,
    reserve: "38.20 MT",
    reserveVal: 38.20,
    status: "pending", // Pending human review
    confidence: 89,
    sourcePage: 4,
    sourceTable: "Table 2.1: Seam-Wise Production Targets & Proved Reserves Breakdown",
    sourceSnippet: "Seam IX/X (Deep Horizon) | Semi-Coking W-IV | Target: 4.50 MT | Actual: 4.85 MT | Proved Reserves: 38.20 MT",
    spatialBox: "[X:142, Y:528, W:820, H:38]",
    warnings: [
      "HISTORICAL VARIANCE TRIGGER (+14.2% YoY): Production reported is 4.85 MT vs FY22 baseline of 4.25 MT. Confirmed by Section 2 longwall addition footnote."
    ],
    reviewerComment: "Confirmed against Section 2 footnote: increase due to mechanized longwall commissioning in Q3.",
  },
  {
    id: "REC-002",
    docId: "DOC-002",
    docName: "SECL_Gevra_Annual_2023.pdf",
    project: "Gevra Expansion Phase II",
    colliery: "Korba Coalfield",
    subsidiary: "SECL",
    year: "FY 2022-23",
    production: "42.50 MT",
    productionVal: 42.50,
    reserve: "410.00 MT",
    reserveVal: 410.00,
    status: "pending", // Pending review
    confidence: 91,
    sourcePage: 48,
    sourceTable: "Table 48: Open Cast Extraction & Proved Pit Margins",
    sourceSnippet: "Gevra Expansion Phase II | SECL Korba Zone | Reconciled Extraction: 42.50 MT | In-Situ Reserve: 410.00 MT",
    spatialBox: "[X:110, Y:415, W:790, H:42]",
    warnings: [
      "Historical +18% variance against baseline due to new 42-cu.m shovel deployment."
    ],
    reviewerComment: "",
  },
  {
    id: "REC-003",
    docId: "DOC-002",
    docName: "SECL_Gevra_2023.pdf",
    project: "Gevra Expansion OCP",
    colliery: "Korba Coalfield",
    subsidiary: "SECL",
    year: "FY 2022-23",
    production: "52.50 MT",
    productionVal: 52.50,
    reserve: "410.00 MT",
    reserveVal: 410.00,
    status: "validated",
    confidence: 96,
    sourcePage: 12,
    sourceTable: "Section 4 Summary",
    sourceSnippet: "Gevra OCP FY23 dispatch and extraction total: 52.50 MT with certified proved reserves of 410.00 MT.",
    spatialBox: "[X:120, Y:300, W:750, H:35]",
    warnings: [],
    reviewerComment: "Verified against statutory DGMS Form-12 submission.",
  },
  {
    id: "REC-004",
    docId: "DOC-002",
    docName: "SECL_Kusmunda.pdf",
    project: "Kusmunda Opencast",
    colliery: "Bilaspur Zone",
    subsidiary: "SECL",
    year: "FY 2022-23",
    production: "43.20 MT",
    productionVal: 43.20,
    reserve: "320.50 MT",
    reserveVal: 320.50,
    status: "validated",
    confidence: 95,
    sourcePage: 8,
    sourceTable: "Table 3.2: Production & Stock Summary",
    sourceSnippet: "Kusmunda Opencast Pit #3 extraction reached 43.20 MT. Block proved geological reserve: 320.50 MT.",
    spatialBox: "[X:95, Y:220, W:810, H:36]",
    warnings: [],
    reviewerComment: "Approved after reconciliation with weighbridge records.",
  },
  {
    id: "REC-005",
    docId: "DOC-003",
    docName: "NCL_Singrauli_FY22.pdf",
    project: "Singrauli Block-B",
    colliery: "Northern Field",
    subsidiary: "NCL",
    year: "FY 2021-22",
    production: "21.40 MT",
    productionVal: 21.40,
    reserve: "185.00 MT",
    reserveVal: 185.00,
    status: "validated",
    confidence: 98,
    sourcePage: 6,
    sourceTable: "Sheet: Annual Production and Reserves",
    sourceSnippet: "Singrauli Moher Basin Block-B recorded production of 21.40 MT. Total certified reserve: 185.00 MT.",
    spatialBox: "[X:105, Y:180, W:780, H:32]",
    warnings: [],
    reviewerComment: "Signed off by Senior Mine Geologist.",
  },
  {
    id: "REC-006",
    docId: "DOC-004",
    docName: "ECL_Raniganj_2023.pdf",
    project: "Raniganj Underground",
    colliery: "Asansol Area",
    subsidiary: "ECL",
    year: "FY 2022-23",
    production: "2.10 MT",
    productionVal: 2.10,
    reserve: "45.80 MT",
    reserveVal: 45.80,
    status: "validated",
    confidence: 94,
    sourcePage: 19,
    sourceTable: "Section 7: Deep Seam Reserve Audit",
    sourceSnippet: "Raniganj Underground Colliery dispatched 2.10 MT of non-coking coal. Geological reserves stand at 45.80 MT.",
    spatialBox: "[X:130, Y:450, W:740, H:38]",
    warnings: [],
    reviewerComment: "Reconciled with ECL quarterly audit.",
  },
  {
    id: "REC-007",
    docId: "DOC-005",
    docName: "BCCL_Katras_Area_Annual_Production_2023.pdf",
    project: "Katras Area Seam VII",
    colliery: "BCCL RI-II",
    subsidiary: "BCCL",
    year: "FY 2022-23",
    production: "3.12 MT",
    productionVal: 3.12,
    reserve: "24.50 MT",
    reserveVal: 24.50,
    status: "validated",
    confidence: 97,
    sourcePage: 3,
    sourceTable: "Table 1.4: Mining Division Dispatch",
    sourceSnippet: "Katras Area Seam VII net output: 3.12 MT. Measured proved reserves: 24.50 MT.",
    spatialBox: "[X:100, Y:190, W:800, H:34]",
    warnings: [],
    reviewerComment: "Validated and verified against statutory dispatch slips.",
  }
];

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [selectedRecordId, setSelectedRecordId] = useState("REC-001");

  // Four KPI Metrics
  const processedCount = documents.length;
  const pendingQueue = records.filter((r) => r.status === "pending");
  const pendingCount = pendingQueue.length;
  const validatedCount = records.filter((r) => r.status === "validated").length;
  const conflictCount = 3; // Documented citation conflicts requiring action

  // Upload document simulation (extracts Project, Year, Production, Reserve)
  const uploadDocument = (file) => {
    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
    const isPdf = file.name.endsWith(".pdf");
    const docType = isExcel ? "Excel" : isPdf ? "PDF" : "Image";

    const newDoc = {
      id: `DOC-${Date.now()}`,
      name: file.name,
      type: docType,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: "Just now",
      status: "Processing",
      pages: isExcel ? 4 : 16,
      recordsExtracted: 0,
    };

    setDocuments((prev) => [newDoc, ...prev]);

    return new Promise((resolve) => {
      setTimeout(() => {
        const prodVal = (Math.random() * 8 + 1.5).toFixed(2);
        const resVal = (Math.random() * 90 + 30).toFixed(2);
        const projectNames = [
          "Dhanbad Seam XI Open Pit",
          "Karanpura South Block C",
          "Bilaspur Dipside Sector II",
          "Singrauli Moher Expansion"
        ];
        const chosenProject = projectNames[Math.floor(Math.random() * projectNames.length)];

        const newRecord = {
          id: `REC-${Date.now()}`,
          docId: newDoc.id,
          docName: newDoc.name,
          project: chosenProject,
          colliery: "CMPDI Central Zone",
          subsidiary: "CIL",
          year: "FY 2023-24",
          production: `${prodVal} MT`,
          productionVal: parseFloat(prodVal),
          reserve: `${resVal} MT`,
          reserveVal: parseFloat(resVal),
          status: "pending",
          confidence: Math.floor(Math.random() * 12) + 85,
          sourcePage: 3,
          sourceTable: "Table 1.2: Annual Production & Geological Reserve",
          sourceSnippet: `${chosenProject} | Annual Extraction: ${prodVal} MT | Proved Coal Reserve: ${resVal} MT`,
          spatialBox: "[X:130, Y:340, W:760, H:40]",
          warnings: ["Extracted via Hybrid OCR + Layout parser. Please verify before sign-off."],
          reviewerComment: "",
        };

        setDocuments((prev) =>
          prev.map((d) => (d.id === newDoc.id ? { ...d, status: "Completed", recordsExtracted: 1 } : d))
        );
        setRecords((prev) => [newRecord, ...prev]);
        setSelectedRecordId(newRecord.id);
        resolve({ doc: newDoc, record: newRecord });
      }, 1600);
    });
  };

  // Approve a record (moves from pending to validated)
  const approveRecord = (id, comment = "") => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "validated",
              reviewerComment: comment || r.reviewerComment || "Approved by Senior Reviewer.",
              warnings: [],
            }
          : r
      )
    );
  };

  // Reject a record
  const rejectRecord = (id, comment = "") => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "rejected",
              reviewerComment: comment || "Rejected to quarantine during human review.",
            }
          : r
      )
    );
  };

  // Edit fields of a record
  const editRecord = (id, updates, comment = "") => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ...updates,
              status: "validated",
              reviewerComment: comment || "Manually adjusted and approved by reviewer.",
              warnings: [],
            }
          : r
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        documents,
        records,
        pendingQueue,
        processedCount,
        pendingCount,
        validatedCount,
        conflictCount,
        selectedRecordId,
        setSelectedRecordId,
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
