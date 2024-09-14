import { cn } from "@/app/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[hsl(240,3.7%,9%)]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
