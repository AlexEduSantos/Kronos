"use client";
import { ChevronLeft, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const link = [
    { name: "Home", href: "/" },
    { name: "Cronogramas", href: "/schedules" },
    { name: "Configurações", href: "/settings" },
  ];

  let currentLinkName = "Título";
  if (pathname === "/") {
    currentLinkName = "Home";
  } else {
    const found = link.find(
      (item) => pathname.startsWith(item.href) && item.href !== "/"
    );
    if (found) {
      currentLinkName = found.name;
    }
  }

  return (
    <div className="w-full h-20 bg-white py-2 px-6 flex justify-between items-center text-primary-foreground">
      <ChevronLeft className="h-6 w-6" onClick={() => router.back()} />
      <h2 className="text-2xl font-bold text-center">{currentLinkName}</h2>
      <Search className="h-6 w-6" />
    </div>
  );
};

export default Header;
