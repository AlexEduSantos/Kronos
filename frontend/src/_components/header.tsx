"use client";
import { useUser } from "@/_viewmodels/useUser";
import { BellDot, Loader2 } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/_viewmodels/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const { userData: user, isLoading, isError, error } = useUser();

  if (error) return <div>{error.message}</div>;

  if (isLoading || isError || user === undefined) {
    return (
      <div className="w-full flex items-center justify-between bg-white fixed top-0 z-50">
        <Skeleton className="w-full h-16 bg-background/20 rounded-none flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin opacity-20" />
        </Skeleton>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center px-6 justify-between bg-white py-3 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-solid text-primary-foreground flex items-center justify-center overflow-hidden relative">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user?.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
                fill
                loading="eager"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={30}
              align="start"
              alignOffset={-30}
              className="p-0"
            >
              <DropdownMenuItem className="p-1">
                <Button
                  className="w-full text-white"
                  variant="secondary"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="leading-none">
          <span className="text-md text-primary-foreground leading-none">
            Olá, {user?.name}
          </span>
          <h1 className="text-lg font-semibold text-primary-foreground leading-none"></h1>
        </div>
      </div>
      <span className="w-10 h-10 rounded-full text-primary-foreground flex items-center justify-center overflow-hidden">
        <BellDot size={24} className=" " />
      </span>
    </div>
  );
};

export default Header;
