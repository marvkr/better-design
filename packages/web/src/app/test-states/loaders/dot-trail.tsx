export function DotTrail({ size = 28 }: { size?: number }) {
  const dot = Math.max(3, Math.round(size * 0.15));
  const count = 6;
  const radius = size / 2 - dot / 2;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{
        width: size,
        height: size,
        animation: "loader-spin 1500ms linear infinite",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius + size / 2 - dot / 2;
        const y = Math.sin(angle) * radius + size / 2 - dot / 2;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-current"
            style={{
              width: dot,
              height: dot,
              left: x,
              top: y,
              animation: `loader-dot-trail 1200ms ease-in-out infinite`,
              animationDelay: `${i * 120}ms`,
            }}
          />
        );
      })}
    </span>
  );
}
