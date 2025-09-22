import { cn } from "@/_lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-xl shadow", className)}
      {...props}
    />
  )
}

export { Skeleton }
