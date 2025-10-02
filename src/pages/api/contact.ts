export const prerender = false; // 👈 required for POST endpoints in static projects

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const TO_EMAIL = "amkruma@gmail.com";
const FROM_EMAIL = "Website <onboarding@resend.dev>";

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData(); // see #2 below
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const subject = `Website inquiry — ${name}`;
    const text =
`Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
---
${message}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text
    });

    if (error) {
      console.error(error);
      return new Response("Send failed", { status: 500 });
    }

    const origin = new URL(request.url).origin;
    const thankYou = new URL("/thank-you", origin);
    return Response.redirect(thankYou, 303);
  } catch (e) {
    console.error(e);
    return new Response("Unexpected error", { status: 500 });
  }
};