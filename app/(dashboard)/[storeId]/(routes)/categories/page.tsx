import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import CategoriesClient from "./components/client";
import { CategoriesColumns } from "./components/columns";

type Props = {
  params: { storeId: string };
};

const Categories: React.FC<Props> = async ({ params }) => {
  const { storeId } = params;

  const Categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumns[] = Categories.map(
    (category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard?.label,
      createdAt: format(category.createdAt, "do MMM, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
