export function BarWave({
  size = 28,
  bars = 5,
}: {
  size?: number;
  bars?: number;
}) {
  const barWidth = Math.max(2, Math.round(size * 0.11));
  const gap = Math.max(2, Math.round(size * 0.08));
  const totalWidth = bars * barWidth + (bars - 1) * gap;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-flex items-center"
      style={{ width: totalWidth, height: size, gap }}
    >
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className="bg-current rounded-[1px]"
          style={{
            width: barWidth,
            height: "100%",
            transformOrigin: "center",
            animation: `loader-bar-rise 1100ms ease-in-out infinite`,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </span>
  );
}
