export function StaggeredScale({
  size = 28,
  count = 5,
}: {
  size?: number;
  count?: number;
}) {
  const cell = Math.max(3, Math.round(size * 0.18));
  const gap = Math.max(2, Math.round(size * 0.08));
  const totalWidth = count * cell + (count - 1) * gap;
  // Animation order: center outward
  const mid = (count - 1) / 2;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-flex items-center"
      style={{ width: totalWidth, height: size, gap }}
    >
      {Array.from({ length: count }, (_, i) => {
        const distance = Math.abs(i - mid);
        return (
          <span
            key={i}
            className="bg-current rounded-[2px]"
            style={{
              width: cell,
              height: cell,
              animation: `loader-staggered-scale 1100ms ease-in-out infinite`,
              animationDelay: `${distance * 140}ms`,
            }}
          />
        );
      })}
    </span>
  );
}
