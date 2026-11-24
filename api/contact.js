export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.SITE_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  const { name = "", email = "", message = "", company_website = "" } = req.body || {};
  if (company_website) return res.status(200).json({ ok: true });
  if (!name.trim() || !email.trim() || !message.trim()) {
    return res.status(400).json({ error: "Please complete all fields." });
  }
  if (name.length > 80 || email.length > 120 || message.length > 3000) {
    return res.status(400).json({ error: "Please shorten your message and try again." });
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) return res.status(400).json({ error: "Please enter a valid email address." });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    return res.status(503).json({ error: "Contact email is not configured yet." });
  }

  const safe = (s) => String(s).replace(/[<>]/g, "");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio enquiry from ${safe(name)}`,
      text: `Name: ${safe(name)}\nEmail: ${safe(email)}\n\n${safe(message)}`
    })
  });
  if (!response.ok) {
    return res.status(502).json({ error: "Email provider could not deliver the message. Please email directly." });
  }
  return res.status(200).json({ ok: true });
}
