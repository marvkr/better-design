export function Orbit({ size = 28 }: { size?: number }) {
  const dot = Math.max(3, Math.round(size * 0.13));
  return (
    <span
      role="status"
      aria-label="Loading"
      className="relative inline-block"
      style={{
        width: size,
        height: size,
        animation: "loader-orbit 1400ms linear infinite",
      }}
    >
      {[0, 90, 180, 270].map((deg, i) => (
        <span
          key={deg}
          className="absolute rounded-full bg-current"
          style={{
            width: dot,
            height: dot,
            top: "50%",
            left: "50%",
            marginTop: -dot / 2,
            marginLeft: -dot / 2,
            transform: `rotate(${deg}deg) translateX(${size / 2 - dot / 2}px)`,
            opacity: 1 - i * 0.22,
          }}
        />
      ))}
    </span>
  );
}
