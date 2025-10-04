import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_bfSCqgKe_MRZMasxo9z5zhGksZdaXfuA8");
const TO_EMAIL = "stojsavljevic.blagoje@gmail.com";
const FROM_EMAIL = "Website <onboarding@resend.dev>";
const POST = async ({ request }) => {
  try {
    const form = await request.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) {
      return new Response("Missing fields", { status: 400 });
    }
    const subject = `Website inquiry — ${name}`;
    const text = `Name: ${name}
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
