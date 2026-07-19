import type { ReactNode } from "react";

export function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md ${className}`}
    >
      <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-teal-300">
        {title}
      </p>
      {children}
    </div>
  );
}

export function StatValue({ value }: { value: string | number }) {
  return (
    <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
      {value}
    </p>
  );
}
