``
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Environmental Impact Assessment Report",
    category: "Environmental",
    uploaded: "02 Sep 2026",
    pages: 84,
    confidence: "98.6%",
    status: "Processed",
  },
  {
    id: 2,
    name: "Geological Survey - Block A",
    category: "Geological",
    uploaded: "01 Sep 2026",
    pages: 62,
    confidence: "97.2%",
    status: "Processed",
  },
  {
    id: 3,
    name: "Mining Feasibility Study",
    category: "Technical",
    uploaded: "31 Aug 2026",
    pages: 118,
    confidence: "91.8%",
    status: "Validation",
  },
  {
    id: 4,
    name: "Groundwater Assessment Report",
    category: "Environmental",
    uploaded: "30 Aug 2026",
    pages: 56,
    confidence: "96.4%",
    status: "Processed",
  },
  {
    id: 5,
    name: "Coal Reserve Estimation Report",
    category: "Geological",
    uploaded: "29 Aug 2026",
    pages: 91,
    confidence: "89.7%",
    status: "Review",
  },
  {
    id: 6,
    name: "Mine Safety Assessment",
    category: "Safety",
    uploaded: "28 Aug 2026",
    pages: 73,
    confidence: "95.1%",
    status: "Processed",
  },
];

const filters = [
  "All Documents",
  "Processed",
  "Validation",
  "Review",
];

const DocumentTable = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Documents");
  const [selectedDocument, setSelectedDocument] = useState(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All Documents" ||
        doc.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const getStatusStyles = (status) => {
    if (status === "Processed") {
      return {
        icon: CheckCircle2,
        className: "text-slate-500 bg-[#eef1f4]",
      };
    }

    if (status === "Validation") {
      return {
        icon: AlertCircle,
        className: "text-slate-600 bg-[#eef1f4]",
      };
    }

    return {
      icon: Clock3,
      className: "text-slate-500 bg-[#eef1f4]",
    };
  };

  return (
    <div className="space-y-5">
      <div className="neu-card p-6">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-700">
              Document Repository
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Search and manage your processed documents
            </p>
          </div>

          <div className="neu-inset flex items-center gap-3 px-4 py-3 w-full xl:w-80">
            <Search size={18} className="text-slate-400 shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          <Filter size={16} className="text-slate-400 shrink-0 mr-1" />

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-[#eef1f4] text-slate-700 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.18),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]"
                  : "text-slate-400 hover:text-slate-600 hover:bg-[#f4f6f8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="neu-card overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200/70">
                <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Document
                </th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Category
                </th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Uploaded
                </th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Pages
                </th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  OCR Confidence
                </th>
                <th className="text-left px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((doc) => {
                const status = getStatusStyles(doc.status);
                const StatusIcon = status.icon;

                return (
                  <tr
                    key={doc.id}
                    className="border-b border-slate-200/60 last:border-0 hover:bg-white/40 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3 min-w-[280px]">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-[#eef1f4] flex items-center justify-center text-slate-500">
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            {doc.name}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Document #{String(doc.id).padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <span className="text-xs text-slate-500">
                        {doc.category}
                      </span>
                    </td>

                    <td className="px-4 py-5 text-xs text-slate-500">
                      {doc.uploaded}
                    </td>

                    <td className="px-4 py-5 text-xs text-slate-500">
                      {doc.pages}
                    </td>

                    <td className="px-4 py-5">
                      <span className="text-xs font-semibold text-slate-600">
                        {doc.confidence}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {doc.status}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#eef1f4] text-xs font-medium text-slate-500 shadow-[3px_3px_7px_rgba(163,177,198,0.18),-3px_-3px_7px_rgba(255,255,255,0.8)] hover:text-slate-700 hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden p-4 space-y-4">
          {filteredDocuments.map((doc) => {
            const status = getStatusStyles(doc.status);
            const StatusIcon = status.icon;

            return (
              <div
                key={doc.id}
                className="rounded-2xl bg-[#eef1f4] p-4 shadow-[inset_3px_3px_7px_rgba(163,177,198,0.16),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#f4f6f8] flex items-center justify-center text-slate-500">
                    <FileText size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {doc.name}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {doc.category} • {doc.pages} pages
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <p className="text-[10px] text-slate-400">
                      Uploaded
                    </p>
                    <p className="text-xs font-medium text-slate-600 mt-1">
                      {doc.uploaded}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">
                      OCR Confidence
                    </p>
                    <p className="text-xs font-medium text-slate-600 mt-1">
                      {doc.confidence}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mt-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-medium ${status.className}`}
                  >
                    <StatusIcon size={14} />
                    {doc.status}
                  </div>

                  <button
                    onClick={() => setSelectedDocument(doc)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f4f6f8] text-xs font-medium text-slate-500"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="py-16 text-center">
            <FileText
              size={28}
              className="mx-auto text-slate-300"
            />
            <p className="text-sm font-medium text-slate-500 mt-3">
              No documents found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center p-5"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="neu-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#eef1f4] flex items-center justify-center text-slate-500">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    {selectedDocument.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedDocument.category} •{" "}
                    {selectedDocument.pages} pages
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocument(null)}
                className="px-3 py-2 rounded-xl bg-[#eef1f4] text-xs text-slate-500"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="neu-inset p-4">
                <p className="text-[10px] text-slate-400">
                  Uploaded
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-2">
                  {selectedDocument.uploaded}
                </p>
              </div>

              <div className="neu-inset p-4">
                <p className="text-[10px] text-slate-400">
                  Pages
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-2">
                  {selectedDocument.pages}
                </p>
              </div>

              <div className="neu-inset p-4">
                <p className="text-[10px] text-slate-400">
                  OCR Confidence
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-2">
                  {selectedDocument.confidence}
                </p>
              </div>

              <div className="neu-inset p-4">
                <p className="text-[10px] text-slate-400">
                  Status
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-2">
                  {selectedDocument.status}
                </p>
              </div>
            </div>

            <div className="neu-inset p-5 mt-5">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-600">
                  Document Preview
                </h3>
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-6">
                This document has been processed by the OCR engine.
                Extracted text, AI analysis and validation information
                will appear here when the backend processing pipeline
                is connected.
              </p>

              <div className="flex items-center gap-2 mt-4">
                <CheckCircle2
                  size={16}
                  className="text-slate-500"
                />
                <span className="text-xs text-slate-500">
                  OCR processing completed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;

