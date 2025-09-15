"use client";
import { useUser } from "@/_viewmodels/useUser";
import { Bell } from "lucide-react";
import { useAuth } from "@/_viewmodels/useAuth";
import { Skeleton } from "@/_components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";

const Header = () => {
  const { user, isLoading } = useUser();
  const { onLogout: logout } = useAuth();

  if (isLoading)
    return (
      <>
        <div className="w-full h-20 bg-white p-2 flex justify-between items-center">
          <Skeleton className="w-12 h-12 rounded-full bg-current/20" />
          <Skeleton className="w-12 h-12 rounded-full bg-current/20" />
        </div>
      </>
    );

  return (
    <div className="w-full h-20 bg-white p-2 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="rounded-full h-12 w-12 relative overflow-hidden shadow">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={5}
              align="start"
              className="border-none bg-white p-2"
            >
              <Button
                onClick={() => logout()}
                variant="secondary"
                className="w-full"
              >
                Sair
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Olá, {user?.name}</h2>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
      <div className="mr-4 h-12 w-12 rounded-full flex items-center justify-center shadow">
        <Bell className="stroke-1" />
      </div>
    </div>
  );
};

export default Header;
