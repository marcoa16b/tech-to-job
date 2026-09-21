import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#0a0e10",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              border: "1px solid rgba(132, 192, 191, 0.3)",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            404
          </span>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Página no encontrada
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem" }}>
            Vuelve al inicio.
          </p>
          <Link
            href="/es"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#ffffff",
              color: "#0a0e10",
              borderRadius: "9999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ir al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}