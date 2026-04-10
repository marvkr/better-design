export function RingSpinner({ size = 28 }: { size?: number }) {
  const border = Math.max(2, Math.round(size * 0.11));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-20"
        style={{ border: `${border}px solid currentColor` }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: `${border}px solid transparent`,
          borderTopColor: "currentColor",
          animation: "loader-spin 900ms linear infinite",
        }}
      />
    </span>
  );
}
