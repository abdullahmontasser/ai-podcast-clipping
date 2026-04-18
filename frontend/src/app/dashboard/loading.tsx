import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-6 p-12">
      <div className="rounded-full bg-primary/10 p-5 ring-1 ring-primary/20 animate-pulse">
        <Loader2 className="text-primary h-12 w-12 animate-spin" />
      </div>
      <span className="font-sans text-xl font-bold tracking-tight text-foreground/80">
        Loading dashboard...
      </span>
    </div>
  );
}
