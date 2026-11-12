import { ImageResponse } from "next/og";
import { copy } from "@/data/content";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{
      display: "flex",
      position: "relative",
      flexDirection: "column",
      justifyContent: "flex-end",
      width: "100%",
      height: "100%",
      padding: "64px 76px",
      background: "linear-gradient(142deg, #050505, #141414 60%, #1f1f1f)",
      color: "#ffffff",
    }}>
      <div style={{
        display: "flex",
        position: "absolute",
        top: 64,
        right: 76,
        width: 320,
        height: 385,
        border: "1px solid #6b6b6b",
        background: "linear-gradient(165deg, #3d3d3d, #0d0d0d)",
      }} />
      <div style={{ display: "flex", width: 152, height: 2, background: "#ffffff", marginBottom: 30 }} />
      <div style={{ display: "flex", fontSize: 82, letterSpacing: -5 }}>{copy.en.profile}</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
