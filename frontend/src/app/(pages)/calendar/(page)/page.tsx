"use client";
import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardTitle } from "@/_components/ui/card";
import { mockData } from "@/_mock/data";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CalendarPage = () => {
  const data = mockData;
  const router = useRouter();

  return (
    <div className="relative w-full h-full flex flex-col gap-2 py-2">
      <div className="flex flex-col gap-2">
        {data.length > 0 ? (
          <>
            {data.map((item) => (
              <Card
                key={item.name}
                onClick={() => router.push(`/calendar/${item.id}`)}
                className={`flex flex-col gap-2 border-none shadow-xs rounded-md p-2 ${
                  item.status === "true" ? "bg-primary" : ""
                }`}
              >
                <CardTitle className="text-lg font-bold text-primary-foreground">
                  {item.name}
                </CardTitle>
                <CardContent className="px-2">
                  <p className="text-gray-500">
                    Data do Teste:{" "}
                    {format(new Date(item.testDay), "dd/MM/yyyy")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div>
            <p className="text-gray-500">Nenhum cronograma cadastrado.</p>
          </div>
        )}
      </div>
      <Link href="/calendar/new">
        <Button className="rounded-full w-14 h-14 p-0 m-0 fixed bottom-20 right-4 flex items-center justify-center shadow-md z-10">
          <div className="flex items-center justify-center">
            <PlusIcon size={32} />
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default CalendarPage;
