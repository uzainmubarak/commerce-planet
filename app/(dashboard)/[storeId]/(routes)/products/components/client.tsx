"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { ProductColumns, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import Link from "next/link";

type Props = {
  data: ProductColumns[]
}

const ProductClient: React.FC<Props> = ({data}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage your products"
        />
        <Link href="products/new">
        <Button>
          <Plus size="16" className="mr-1" />
          Add New
        </Button>
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList endPoint="products" endPointId="productId"/>
    </>
  );
};

export default ProductClient;
