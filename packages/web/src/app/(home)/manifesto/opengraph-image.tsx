import { ImageResponse } from "next/og";

export const alt = "Manifesto — Better Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 16,
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            marginBottom: 32,
          }}>
          <span style={{ fontSize: 40, color: "white", fontWeight: 700 }}>
            BD
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
          }}>
          Design is the moat.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: 20,
            textAlign: "center",
          }}>
          Here&apos;s what we stand for.
        </div>
      </div>
    ),
    { ...size }
  );
}
