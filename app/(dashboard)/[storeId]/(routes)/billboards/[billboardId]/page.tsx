import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

type Props = {
  params: { billboardId: string };
};

const Billboard: React.FC<Props> = async ({ params }) => {
  const billboard =
    params.billboardId === "new"
      ? null
      : await prismadb.billboard.findUnique({
          where: {
            id: params.billboardId,
          },
        });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default Billboard;
