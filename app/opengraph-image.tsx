import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Jayanth Murala, full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The display face has to be loaded from disk: satori cannot read the woff2
// that next/font serves, so the share card would silently fall back to a thin
// system sans and stop looking like the site.
const display = await readFile(join(process.cwd(), "assets/Unbounded-ExtraBold.ttf"));

// Generated rather than shipped as a file so the card can never drift out of
// sync with the name and roles on the site.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#00A896", fontSize: 26, letterSpacing: 8 }}>
          FULL-STACK ENGINEER
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Unbounded" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 132, lineHeight: 1.02 }}>
            JAYANTH
          </div>
          <div style={{ display: "flex", color: "#00A896", fontSize: 132, lineHeight: 1.02 }}>
            MURALA
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.65)", fontSize: 30 }}>
            Web apps, AI products and automation. Built to hold.
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.35)", fontSize: 24, letterSpacing: 4 }}>
            MACHILIPATNAM, INDIA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Unbounded", data: display, style: "normal", weight: 800 }],
    },
  );
}
