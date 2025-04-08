import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function useNavigate(){
  const path = usePathname();

  const routes = useMemo(() => [
    {
      title: "Home",
      href: "/",
      active: path === "/",
    },
    {
      title: "Cart",
      href: "/cart",
      active: path === "/cart",
    },
    {
      title: "Order",
      href: "/order",
      active: path === "/order",
    },
  ], [path]);

  return routes;
}