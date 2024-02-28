"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";

export type BillboardsColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardsColumns>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
