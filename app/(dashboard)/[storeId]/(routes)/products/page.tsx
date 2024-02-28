import prismadb from "@/lib/prismadb";

import ProductClient from "./components/client";
import { ProductColumns } from "./components/columns";

type Props = {
  params: { storeId: string };
};

const Products: React.FC<Props> = async ({ params }) => {
  const { storeId } = params;

  

  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumns[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    stock: product.stock,
    image: product.images[0].url,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
