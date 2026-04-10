export function DashSpinner({ size = 28 }: { size?: number }) {
  const border = Math.max(2, Math.round(size * 0.11));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{
          border: `${border}px solid transparent`,
          borderTopColor: "currentColor",
          borderRightColor: "currentColor",
          animation: "loader-spin 1100ms linear infinite",
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          inset: border + 1,
          border: `${border}px solid transparent`,
          borderBottomColor: "currentColor",
          borderLeftColor: "currentColor",
          animation: "loader-spin-reverse 900ms linear infinite",
        }}
      />
    </span>
  );
}
