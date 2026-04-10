import { ImageResponse } from "next/og";

export const alt = "Better Design - Beautiful UI, built in minutes";
export const size = { width: 1200, height: 600 };
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
          padding: "50px",
        }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 70,
            height: 70,
            borderRadius: 14,
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            marginBottom: 28,
          }}>
          <span style={{ fontSize: 36, color: "white", fontWeight: 700 }}>
            BD
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
          }}>
          Beautiful UI, built in minutes
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: 16,
            marginBottom: 32,
            textAlign: "center",
          }}>
          Tell us your design style &#8212; we&apos;ll generate components that
          match.
        </div>

        {/* Style labels row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 28,
          }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: 14,
            }}>
            Linear style
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: 14,
            }}>
            Supabase style
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: 14,
            }}>
            Airbnb style
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: 14,
            }}>
            Notion style
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              fontSize: 14,
            }}>
            Stripe style
          </div>
        </div>

        {/* Built with badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: 14,
          }}>
          Built with Tailwind & shadcn/ui
        </div>
      </div>
    ),
    { ...size }
  );
}
