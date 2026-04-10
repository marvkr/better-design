export function PulseRing({ size = 28 }: { size?: number }) {
  const border = Math.max(2, Math.round(size * 0.08));
  const dot = Math.max(4, Math.round(size * 0.22));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full"
          style={{
            border: `${border}px solid currentColor`,
            animation: `loader-ring-expand 1600ms ease-out ${i * 800}ms infinite`,
          }}
        />
      ))}
      <span
        className="rounded-full bg-current"
        style={{ width: dot, height: dot }}
      />
    </span>
  );
}
