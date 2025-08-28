
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="bg-white shadow-sm rounded-xl">
          <td className="px-5 py-3"><Skeleton className="h-4 w-24" /></td>
          <td className="px-5 py-3"><Skeleton className="h-4 w-32" /></td>
          <td className="px-5 py-3"><Skeleton className="h-4 w-8" /></td>
          <td className="px-5 py-3">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
          </td>
          <td className="px-5 py-3"><Skeleton className="h-4 w-12" /></td>
          <td className="px-5 py-3"><Skeleton className="h-6 w-20 rounded-md" /></td>
          <td className="px-5 py-3 flex gap-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-5 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
}
