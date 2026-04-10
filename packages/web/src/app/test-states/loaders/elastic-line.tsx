export function ElasticLine({ size = 28 }: { size?: number }) {
  const thickness = Math.max(2, Math.round(size * 0.12));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block rounded-full overflow-hidden"
      style={{
        width: size,
        height: thickness,
        backgroundColor: "currentColor",
        opacity: 0.2,
      }}
    >
      <span
        className="absolute top-0 rounded-full bg-current"
        style={{
          height: "100%",
          opacity: 1,
          animation: "loader-elastic-line 1400ms ease-in-out infinite",
        }}
      />
    </span>
  );
}
