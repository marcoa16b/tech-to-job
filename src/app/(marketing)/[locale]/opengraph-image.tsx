import { ImageResponse } from "next/og";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/seo";

export const alt = "TechToJob - Comunidad de developers y empresas tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  await getLocale();
  const t = await getTranslations("OgImage");
  const title = t("title");
  const subtitle = t("subtitle");
  const eyebrow = t("eyebrow");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0e10",
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(132, 192, 191, 0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(132, 192, 191, 0.18), transparent 60%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "rgba(132, 192, 191, 1)",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "rgba(132, 192, 191, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0e10",
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            T
          </div>
          {SITE_NAME}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: 1.35,
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "24px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span style={{ display: "flex" }}>· Discord</span>
            <span style={{ display: "flex" }}>· LinkedIn</span>
            <span style={{ display: "flex" }}>· X</span>
          </div>
          <div style={{ display: "flex", fontWeight: 500 }}>
            {SITE_NAME.replace("TechToJob", "techtojob.com")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}