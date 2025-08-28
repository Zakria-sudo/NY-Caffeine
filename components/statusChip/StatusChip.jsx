
export function StatusChip({ label }) {
  const dot =
    label === "Completed"
      ? "bg-emerald-500"
      : label === "Pending"
      ? "bg-amber-500"
      : label === "Canceled"
      ? "bg-rose-500"
      : "bg-slate-400";
  return (
    <span className="inline-flex items-center gap-1.5 shadow-sm rounded-md border border-[#D5D7DA] font-semibold bg-gray-50 px-2.5 py-1 text-[12px] text-[#545454]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}