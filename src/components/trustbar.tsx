/**
 * Bottom-of-hero trust strip. Static, tiny, monospace — the kind of thing
 * you'd see on a Stripe or Linear page. Not scrolling, not animated.
 */
export function TrustBar() {
  const items = [
    "Mayo Clinic",
    "Karolinska",
    "Charité Berlin",
    "Cleveland Clinic",
    "Johns Hopkins",
    "NHS Digital",
  ];
  return (
    <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.06]">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-slate-500 uppercase">
          Deployed with
        </span>
        {items.map((name) => (
          <span
            key={name}
            className="font-display text-[13px] tracking-tight text-slate-400/80"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
