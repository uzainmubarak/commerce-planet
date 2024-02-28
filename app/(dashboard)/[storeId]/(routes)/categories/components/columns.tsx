"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";

export type CategoriesColumns = {
  id: string;
  name: string;
  billboardLabel?: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
