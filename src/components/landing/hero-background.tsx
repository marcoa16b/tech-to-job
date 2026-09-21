export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 85% -10%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%), radial-gradient(ellipse 70% 60% at -10% 110%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 55%)",
        }}
      />

      <video
        className="absolute inset-0 hidden h-full w-full object-cover opacity-[0.08] lg:block"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/poster.webp"
        src="/hero-bg-c.webm"
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: "var(--foreground)",
        }}
      />
    </div>
  );
}
