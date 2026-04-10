export function DiamondRotate({ size = 28 }: { size?: number }) {
  const cell = Math.round(size * 0.28);
  // 4 diamonds arranged around center: top, right, bottom, left
  const positions = [
    { top: 0, left: "50%", x: -cell / 2, y: 0 },
    { top: "50%", left: "100%", x: -cell, y: -cell / 2 },
    { top: "100%", left: "50%", x: -cell / 2, y: -cell },
    { top: "50%", left: 0, x: 0, y: -cell / 2 },
  ];

  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      {positions.map((p, i) => (
        <span
          key={i}
          className="absolute bg-current"
          style={{
            width: cell,
            height: cell,
            top: p.top,
            left: p.left,
            marginLeft: p.x,
            marginTop: p.y,
            animation: `loader-diamond 1400ms ease-in-out infinite`,
            animationDelay: `${i * 180}ms`,
          }}
        />
      ))}
    </span>
  );
}
