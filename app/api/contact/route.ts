import { NextResponse } from "next/server";
import { Resend } from "resend";

/** Where enquiries land. */
const TO = "jayanthmurala1@gmail.com";
/** Must be a domain verified in Resend; their sandbox sender works untested. */
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

const MAX = { name: 120, email: 200, projectType: 60, message: 4000 } as const;

/** Crude in-memory throttle. Resets on redeploy, which is fine for this. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Bad request." }, { status: 400 });
    }

    // Bots fill hidden fields; humans do not.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const projectType = String(body.projectType ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: "That email address does not look right." },
        { status: 400 }
      );
    }
    if (
      name.length > MAX.name ||
      email.length > MAX.email ||
      projectType.length > MAX.projectType ||
      message.length > MAX.message
    ) {
      return NextResponse.json({ error: "That is too long." }, { status: 400 });
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("[contact] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Mail is not configured yet. Email me directly for now." },
        { status: 503 }
      );
    }

    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `${projectType || "Enquiry"} — ${name}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6">
          <p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p>
          ${projectType ? `<p><strong>About:</strong> ${escape(projectType)}</p>` : ""}
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap">${escape(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { error: "Could not send. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json({ error: "Something broke." }, { status: 500 });
  }
}
