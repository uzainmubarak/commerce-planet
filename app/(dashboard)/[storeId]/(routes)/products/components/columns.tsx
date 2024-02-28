"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";

export type ProductColumns = {
  id: string;
  image: string;
  name: string;
  stock: number;
};

export const columns: ColumnDef<ProductColumns>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "orders",
    header: "Orders",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
