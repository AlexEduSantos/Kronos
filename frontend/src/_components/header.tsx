"use client";
import { ChevronLeft, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const link = [
    { name: "Home", href: "/" },
    { name: "Schedules", href: "/schedules" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <div className="w-full h-20 bg-white py-2 px-6 flex justify-between items-center text-primary-foreground">
      <ChevronLeft className="h-6 w-6" onClick={() => router.back()} />
      <h2 className="text-2xl font-bold text-center">
        {link.find((item) => item.href === pathname)?.name}
      </h2>
      <Search className="h-6 w-6" />
    </div>
  );
};

export default Header;
