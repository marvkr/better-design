export function BreathingCircle({ size = 28 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block rounded-full bg-current"
      style={{
        width: size * 0.72,
        height: size * 0.72,
        animation: "loader-breathe 1600ms ease-in-out infinite",
      }}
    />
  );
}
