export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.SITE_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "This endpoint accepts POST requests only." });

  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.company_website === "string" ? body.company_website.trim() : "";
  if (website) return res.status(200).json({ ok: true });
  if (!name || !email || !message) return res.status(400).json({ error: "Please complete your name, email and message." });
  if (name.length > 80 || email.length > 120 || message.length > 3000) return res.status(400).json({ error: "Please shorten your message and try again." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Please enter a valid email address." });

  const { RESEND_API_KEY: apiKey, CONTACT_TO: to, CONTACT_FROM: from } = process.env;
  if (!apiKey || !to || !from) return res.status(503).json({ error: "Email delivery is not configured on this deployment yet." });
  const safe = value => value.replace(/[<>]/g, "");
  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: email,
        subject: `Portfolio enquiry from ${safe(name)}`,
        text: `Name: ${safe(name)}\nEmail: ${safe(email)}\n\n${safe(message)}`
      })
    });
    if (!providerResponse.ok) {
      const providerError = await providerResponse.json().catch(() => ({}));
      console.error("Resend delivery failed", providerResponse.status, providerError);
      return res.status(502).json({ error: "The email provider could not deliver this message. Please use the direct email link." });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact endpoint error", error);
    return res.status(502).json({ error: "The email service is temporarily unavailable. Please use the direct email link." });
  }
}
