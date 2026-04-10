export function FlipSquare({ size = 28 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block bg-current rounded-[2px]"
      style={{
        width: size * 0.68,
        height: size * 0.68,
        animation: "loader-flip-square 1800ms cubic-bezier(0.65, 0, 0.35, 1) infinite",
      }}
    />
  );
}
