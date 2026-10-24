import { ImageResponse } from "next/og";

export const alt = "Test4Test: Get 20+ active testers for your Android app in 24 hours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F3F4F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 6, color: "#000" }}>
          <span style={{ color: "#0A84FF" }}>[</span>&nbsp;TEST4TEST&nbsp;<span style={{ color: "#0A84FF" }}>]</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#000", maxWidth: 980 }}>
            Get 20+ active testers for your Android app in 24 hours.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#636366" }}>
            Verified 14-day closed testing · Free to start · Google Play
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={i} style={{ width: 56, height: 22, borderRadius: 6, background: i < 13 ? "#0A84FF" : "#F0993A" }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
