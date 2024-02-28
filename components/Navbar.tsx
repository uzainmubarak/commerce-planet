import { UserButton, auth } from "@clerk/nextjs";

import StoreSwitcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

import { ModeToggle } from "./toggle-theme";

import NavLinks from "@/components/NavLinks";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <section className="mr-4">
          <StoreSwitcher items={stores} />
        </section>
        <NavLinks />
        <section className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </section>
      </div>
    </div>
  );
};

export default Navbar;
