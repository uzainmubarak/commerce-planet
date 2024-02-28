// "/store-id" page
import prismadb from "@/lib/prismadb";

type Props = {
  params: { storeId: string };
};

const Dashboard: React.FC<Props> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>{store?.name}</div>;
};

export default Dashboard;
