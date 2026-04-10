export function LineSweep({
  size = 28,
  lines = 4,
}: {
  size?: number;
  lines?: number;
}) {
  const lineHeight = Math.max(2, Math.round(size * 0.09));
  const gap = Math.max(2, Math.round(size * 0.08));
  const totalHeight = lines * lineHeight + (lines - 1) * gap;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-flex flex-col"
      style={{ width: size, height: totalHeight, gap }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className="bg-current rounded-[1px]"
          style={{
            height: lineHeight,
            width: "100%",
            transformOrigin: "left center",
            animation: `loader-line-sweep 1400ms ease-in-out infinite`,
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </span>
  );
}
