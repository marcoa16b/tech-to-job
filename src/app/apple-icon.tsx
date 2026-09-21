import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0e10",
          color: "#84C0BF",
          fontSize: "120px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: "32px",
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}