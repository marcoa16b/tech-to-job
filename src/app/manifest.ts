import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "TechToJob",
    description:
      "Comunidad de desarrolladores y empresas tech en español. Torneos, ofertas y networking.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0e10",
    theme_color: "#0a0e10",
    lang: "es",
    categories: ["social", "business", "productivity"],
    icons: [
      {
        src: "/es/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/es/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}