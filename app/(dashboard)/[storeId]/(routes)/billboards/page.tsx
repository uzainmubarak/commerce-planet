import prismadb from "@/lib/prismadb";
import { format } from "date-fns"

import BillboardsClient from "./components/client";
import { BillboardsColumns } from "./components/columns";

type Props = {
    params: {storeId: string}
}

const Billboards: React.FC<Props> = async ({params}) => {

    const { storeId } = params;

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboards: BillboardsColumns[] = billboards.map(
      (billboard) => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "do MMM, yyyy"),
      })
    );

    
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardsClient data={formattedBillboards} />
        </div>
      </div>
    );
}

export default Billboards;