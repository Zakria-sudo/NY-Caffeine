
export default function Card({
  title,
  subtitle,
  badge,          // small chip (e.g., +3.0%)
  icon,           // NEW: top-right icon/button (e.g., calendar)
  children,
  footer,
  className = "",
  bodyClass = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}
      role="region"
      aria-label={title}
    >
      {(title || subtitle || badge || icon) && (
        <header className="flex gap-3 px-5 pt-4">
          <div>
            {title && (
              <h3 className="text-[20px] font-medium text-gray-700">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-[12px] text-gray-400">{subtitle}</p>
            )}
          </div>
            
              {badge && (
                <div className="">
                  {badge}
                </div>
              )}
            
          {icon && (
            <div className="ml-auto flex items-center gap-2 shrink-0">
              {icon}
              
            </div>
          )}
        </header>
      )}

      {children && <div className={`px-5 pb-4 ${bodyClass}`}>{children}</div>}

      {footer && <footer className="px-5 pb-4 pt-0">{footer}</footer>}
    </section>
  );
}
