import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  onRowClick,
  emptyMessage = 'No matching records found.',
  className = '',
  paginate = true,
  pageSize = 10,
  stickyFirstColumn = true
}) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const handleSort = (field) => {
    if (!field) return;
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Clean numeric strings or percentages
      if (typeof aVal === 'string' && aVal.endsWith('%')) {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (!paginate) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, paginate, currentPage, pageSize]);

  return (
    <div className={`w-full overflow-hidden border border-border rounded-[10px] bg-surface-0 ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-1 text-xs font-semibold text-ink-700 tracking-wider">
              {columns.map((col, idx) => {
                const isSticky = stickyFirstColumn && idx === 0;
                const isSortable = col.sortable !== false && col.accessor;
                return (
                  <th
                    key={col.header || idx}
                    className={`py-3 px-4 select-none whitespace-nowrap ${
                      isSticky
                        ? 'sticky left-0 bg-surface-1 z-20 shadow-[1px_0_0_0_#E2E5EA]'
                        : ''
                    } ${isSortable ? 'cursor-pointer hover:text-ink-900 transition-colors' : ''} ${
                      col.headerClassName || ''
                    }`}
                    onClick={() => isSortable && handleSort(col.accessor)}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="text-ink-500">
                          {sortField === col.accessor ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-brand-700" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-brand-700" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-ink-900">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 px-4 text-center text-ink-500 bg-surface-0 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const key = row[keyField] || rowIdx;
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`transition-colors ${
                      onRowClick ? 'cursor-pointer hover:bg-brand-50/40' : 'hover:bg-surface-1'
                    }`}
                  >
                    {columns.map((col, colIdx) => {
                      const isSticky = stickyFirstColumn && colIdx === 0;
                      const cellValue = col.accessor ? row[col.accessor] : null;
                      return (
                        <td
                          key={col.header || colIdx}
                          className={`py-3.5 px-4 text-sm ${
                            isSticky
                              ? 'sticky left-0 bg-surface-0 z-10 shadow-[1px_0_0_0_#E2E5EA]'
                              : ''
                          } ${col.mono ? 'font-mono' : ''} ${col.className || ''}`}
                        >
                          {col.cell ? col.cell(row, cellValue) : (cellValue ?? '—')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {paginate && sortedData.length > pageSize && (
        <div className="px-4 py-3 border-t border-border bg-surface-1 flex items-center justify-between text-xs text-ink-500">
          <div>
            Showing <span className="font-mono font-medium text-ink-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-mono font-medium text-ink-900">
              {Math.min(currentPage * pageSize, sortedData.length)}
            </span>{' '}
            of <span className="font-mono font-medium text-ink-900">{sortedData.length}</span> records
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-[6px] border border-border bg-surface-0 text-ink-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
            >
              Previous
            </button>
            <span className="px-2 font-mono text-ink-700">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded-[6px] border border-border bg-surface-0 text-ink-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
