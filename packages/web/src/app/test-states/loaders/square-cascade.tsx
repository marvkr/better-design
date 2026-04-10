export function SquareCascade({ size = 28 }: { size?: number }) {
  const cell = Math.round(size * 0.36);
  const gap = Math.round(size * 0.1);
  const total = 2 * cell + gap;
  // Animation order: top-left, top-right, bottom-left, bottom-right
  const delays = [0, 160, 320, 480];

  return (
    <div
      role="status"
      aria-label="Loading"
      className="grid"
      style={{
        width: total,
        height: total,
        gridTemplateColumns: `repeat(2, ${cell}px)`,
        gap,
      }}
    >
      {delays.map((delay, i) => (
        <span
          key={i}
          className="bg-current rounded-[2px]"
          style={{
            width: cell,
            height: cell,
            animation: `loader-square-cascade 1200ms ease-in-out infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}
