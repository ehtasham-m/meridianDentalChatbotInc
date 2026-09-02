import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A1F33",
          color: "#FAF7F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "rgba(250,247,242,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                stroke="#4FBF98"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 600 }}>{SITE.shortName}</span>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
          Precision you can see. Care you can feel.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "rgba(250,247,242,0.6)" }}>
          {SITE.city}&apos;s precision dental studio, since {SITE.founded}
        </div>
      </div>
    ),
    { ...size }
  );
}
