import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="bg-white shadow-sm rounded-xl">
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <Skeleton className="h-4 w-20 sm:w-24 md:w-32" />
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <Skeleton className="h-4 w-24 sm:w-32 md:w-40" />
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <Skeleton className="h-4 w-8 sm:w-10 md:w-12" />
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <div className="flex gap-1 sm:gap-2">
              <Skeleton className="h-6 w-16 sm:w-20 rounded-lg" />
              <Skeleton className="h-6 w-14 sm:w-16 rounded-lg" />
            </div>
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <Skeleton className="h-4 w-12 sm:w-16" />
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <Skeleton className="h-6 w-20 sm:w-24 rounded-md" />
          </td>
          <td className="px-3 py-2 sm:px-5 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
