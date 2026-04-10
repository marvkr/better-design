export function HexDots({ size = 28 }: { size?: number }) {
  const dot = Math.max(3, Math.round(size * 0.13));
  const radius = size / 2 - dot / 2;
  // 6 dots arranged on a hexagon, animated in sequence
  const count = 6;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
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
              animation: `loader-pulse 1200ms ease-in-out infinite`,
              animationDelay: `${i * 140}ms`,
            }}
          />
        );
      })}
    </span>
  );
}
