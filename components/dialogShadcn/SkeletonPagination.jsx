// components/dialogShadcn/SkeletonPagination.jsx
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPagination() {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <Skeleton className="h-9 w-28 rounded-lg" />   {/* Prev */}
      <div className="hidden sm:flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-9 w-24 rounded-lg" />   {/* Next */}
    </div>
  );
}
