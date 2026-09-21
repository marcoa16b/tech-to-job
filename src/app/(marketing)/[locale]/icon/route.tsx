import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sizeParam = searchParams.get("size");
  const size = sizeParam === "192" || sizeParam === "512" ? 512 : 32;

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
          fontSize: `${Math.round(size * 0.7)}px`,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: `${Math.round(size * 0.18)}px`,
        }}
      >
        T
      </div>
    ),
    { width: size, height: size },
  );
}