"use client";
import { CalendarDaysIcon, HomeIcon, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const FooterMenu = () => {
  const pathname = usePathname();
  const link = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Calendar", href: "/calendar", icon: CalendarDaysIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];
  return (
    <div className="w-full h-16 fixed bottom-0 left-0 right-0 bg-white flex items-center justify-around px-6 text-secondary">
      {link.map((item) => {
        const isActive = pathname === item.href;
        return (
          <a
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive ? "bg-primary" : ""
            }`}
          >
            <item.icon className="h-6 w-6" />
          </a>
        );
      })}
    </div>
  );
};

export default FooterMenu;
