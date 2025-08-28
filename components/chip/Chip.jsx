export function Chip({ tone = "neutral", children }) {
  const tones = {
    up: "bg-emerald-50 text-emerald-600",
    down: "bg-rose-50 text-rose-600",
    neutral: "bg-gray-100 text-gray-600",
    active: "bg-emerald-50 text-[#34C759]",
  };

  // Outlined pill for product tags

  const showArrow = tone === "up" || tone === "down";
  const rotation = tone === "down" ? "rotate-180" : "rotate-0";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] sm:text-[13px] ${tones[tone]}`}
    >
      {showArrow && (
        <span
          aria-hidden="true"
          className="grid h-4 w-4 place-items-center rounded-full bg-white/80"
        >
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className={`h-3 w-3 transform ${rotation}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.44583L1.17875 8.625L5.00167 4.73375L8.82125 8.625L10 7.44583L5.00167 2.375L0 7.44583Z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
      <span className="leading-none">{children}</span>
    </span>
  );
}