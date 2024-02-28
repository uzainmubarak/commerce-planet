import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import Navbar from "@/components/Navbar";

import useAuth from "@/hooks/use-auth";

type Props = {
  children: React.ReactNode;
  params: { storeId: string };
};

const DashboardLayout: React.FC<Props> = async ({ children, params }) => {
  const userId = useAuth();

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
