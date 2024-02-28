"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { BillboardsColumns, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

type Props = {
  data: BillboardsColumns[]
}

const BillboardsClient: React.FC<Props> = ({data}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your billboards"
        />
        <Button onClick={() => router.push(`billboards/new`)}>
          <Plus size="16" className="mr-1" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />

      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList endPoint="billboards" endPointId="billboardId"/>
    </>
  );
};

export default BillboardsClient;
