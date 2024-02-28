"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { CategoriesColumns, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

type Props = {
  data: CategoriesColumns[]
}

const CategoriesClient: React.FC<Props> = ({data}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your categories"
        />
        <Button onClick={() => router.push(`categories/new`)}>
          <Plus size="16" className="mr-1" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList endPoint="categories" endPointId="categoryId"/>
    </>
  );
};

export default CategoriesClient;
