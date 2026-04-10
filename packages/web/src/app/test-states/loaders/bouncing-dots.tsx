export function BouncingDots({ size = 28 }: { size?: number }) {
  const dot = Math.max(4, Math.round(size * 0.22));
  const gap = Math.max(3, Math.round(size * 0.14));
  const width = 3 * dot + 2 * gap;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-flex items-center"
      style={{ width, height: size, gap }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="rounded-full bg-current"
          style={{
            width: dot,
            height: dot,
            animation: `loader-bounce 900ms ease-in-out infinite`,
            animationDelay: `${i * 140}ms`,
          }}
        />
      ))}
    </span>
  );
}
