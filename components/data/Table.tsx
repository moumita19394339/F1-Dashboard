"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";

export interface Column<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  sortable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (row: T) => void;
  onSort?: (columnId: string, direction: "asc" | "desc") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  isLoading?: boolean;
  emptyState?: ReactNode;
}

export function Table<T>({
  data,
  columns,
  keyField,
  onRowClick,
  onSort,
  sortColumn,
  sortDirection,
  isLoading,
  emptyState,
}: TableProps<T>) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;
    const direction =
      sortColumn === column.id && sortDirection === "asc" ? "desc" : "asc";
    onSort(column.id, direction);
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    if (sortColumn !== column.id) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return <TableSkeleton columns={columns} />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        {emptyState || <DefaultEmptyState />}
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn(
                  "table-header-cell",
                  column.sortable &&
                    onSort &&
                    "cursor-pointer hover:bg-neutral-200/50 transition-all",
                  column.className,
                )}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.header}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const key = String(row[keyField]);
            return (
              <tr
                key={key}
                className={cn(
                  "table-row",
                  onRowClick && "cursor-pointer",
                  hoveredRow === key && "bg-primary-50/50",
                )}
                onMouseEnter={() => setHoveredRow(key)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn("table-cell", column.className)}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column.id} className="table-header-cell">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="table-row">
              {columns.map((column) => (
                <td key={column.id} className="table-cell">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DefaultEmptyState() {
  return (
    <>
      <div className="rounded-full bg-neutral-100 p-3">
        <svg
          className="h-6 w-6 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-neutral-900">
        No data found
      </h3>
      <p className="mt-2 text-sm text-neutral-500">
        No items to display at this time.
      </p>
    </>
  );
}

// Action buttons component for table rows
export interface TableRowActions {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

export function TableRowMenu({ actions }: { actions: TableRowActions[] }) {
  return (
    <div className="relative group">
      <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-neutral-100 transition-colors">
        <MoreHorizontal className="h-4 w-4 text-neutral-500" />
      </button>
      <div className="absolute right-0 top-full mt-1 w-48 rounded-md bg-white shadow-lg border border-neutral-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-dropdown">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={cn(
              "flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 transition-colors",
              action.variant === "danger" && "text-error-600 hover:bg-error-50",
            )}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
