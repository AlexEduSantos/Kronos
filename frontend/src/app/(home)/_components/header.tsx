"use client";
import { useUser } from "@/_viewmodels/useUser";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/_viewmodels/useAuth";
import { Skeleton } from "@/_components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";
import { useSchedule } from "@/_viewmodels/useSchedule";
import { ScheduleCardProps } from "@/_components/schedule-card";
import Link from "next/link";

const Header = () => {
  const { user, isLoading } = useUser();
  const { onFocus: schedule, isScheduleLoading } = useSchedule();
  const { onLogout: logout } = useAuth();

  const avatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      );
    } else {
      return (
        <img
          src="/profile.jpg"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      );
    }
  };

  if (isLoading || isScheduleLoading)
    return (
      <>
        <Skeleton className="w-full min-h-[115px] bg-white p-4 flex justify-between items-center rounded-none" />
      </>
    );

  return (
    <div className="w-full min-h-20 bg-card p-4 flex justify-between items-center shadow-md">
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl">Olá, {user?.name}! </h2>
        {schedule ? (
          <p className="nowrap line-clamp-2 text-primary">
            Cronograma ativo:
            <br />
            <Link href={`/schedules/${schedule?.id}`}>
              <strong> {schedule?.name}</strong>
            </Link>
          </p>
        ) : null}
      </div>
      <div className="rounded-full max-w-16 aspect-square  relative overflow-hidden shadow">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-full h-full">{avatar()}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sideOffset={5}
            align="end"
            className="border-none p-2"
          >
            <Button onClick={() => logout()} className="w-full">
              <LogOutIcon className="h-4 w-4" />
              Sair
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
