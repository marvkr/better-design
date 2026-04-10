export function MorphingShape({ size = 28 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block bg-current"
      style={{
        width: size * 0.78,
        height: size * 0.78,
        animation: "loader-morph 1800ms ease-in-out infinite",
      }}
    />
  );
}
