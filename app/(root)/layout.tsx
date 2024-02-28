import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import useAuth from "@/hooks/use-auth";

type Props = {
  children: React.ReactNode;
};

const SetupLayout: React.FC<Props> = async ({ children }) => {
  const userId = useAuth();

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
};

export default SetupLayout;
