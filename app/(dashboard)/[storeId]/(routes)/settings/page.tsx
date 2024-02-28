import React from "react";
import { redirect } from "next/navigation";

import useAuth from "@/hooks/use-auth";
import prismadb from "@/lib/prismadb";

import SettingForm from "./components/setting-form";

type Props = {
  params: {
    storeId: string;
  };
};

const Settings: React.FC<Props> = async ({ params: { storeId } }) => {
  const userId = useAuth();
  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: storeId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
