"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type Props = {
  className?: string;
  props: any;
};

const NavLinks: React.FC<React.HTMLAttributes<Props>> = ({
  className,
  ...props
}) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active:
        pathName === `/${params.storeId}/billboards` ||
        pathName.includes(
          `/${params.storeId}/billboards/${params.billboardId}`
        ),
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active:
        pathName === `/${params.storeId}/categories` ||
        pathName.includes(`/${params.storeId}/categories/${params.categoryId}`),
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active:
        pathName === `/${params.storeId}/products` ||
        pathName.includes(`/${params.storeId}/products/${params.productId}`),
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
