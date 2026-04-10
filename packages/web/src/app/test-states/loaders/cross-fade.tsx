export function CrossFade({ size = 28 }: { size?: number }) {
  const thickness = Math.max(2, Math.round(size * 0.1));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute bg-current rounded-[1px]"
        style={{
          width: size,
          height: thickness,
          top: (size - thickness) / 2,
          left: 0,
          animation: "loader-cross-horizontal 1200ms ease-in-out infinite",
        }}
      />
      <span
        className="absolute bg-current rounded-[1px]"
        style={{
          width: thickness,
          height: size,
          top: 0,
          left: (size - thickness) / 2,
          animation: "loader-cross-vertical 1200ms ease-in-out infinite",
        }}
      />
    </span>
  );
}
