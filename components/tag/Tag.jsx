export function Tag({ children, tone = "slate" }) {
  const colors = {
    violet: "text-violet-700 border-violet-300 bg-violet-50",
    blue: "text-blue-700 border-blue-300 bg-blue-50",
    indigo: "text-indigo-700 border-indigo-300 bg-indigo-50",
    slate: "text-slate-600 border-slate-200 bg-slate-50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] ${colors[tone]}`}
    >
      {children}
    </span>
  );
}