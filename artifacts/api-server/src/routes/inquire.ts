import { Router } from "express";
import nodemailer from "nodemailer";
import { SubmitInquiryBody } from "@workspace/api-zod";

const router = Router();

router.post("/inquire", async (req, res) => {
  const parsed = SubmitInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid inquiry data" });
    return;
  }

  const { name, email, date, servings, eventType, details } = parsed.data;

  const adminEmail = process.env.ADMIN_EMAIL;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!adminEmail || !emailPassword) {
    req.log.error("Missing ADMIN_EMAIL or EMAIL_PASSWORD environment variables");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminEmail,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: `"Golden Rose Bakes Inquiry" <${adminEmail}>`,
      to: adminEmail,
      replyTo: email,
      subject: `🌹 New Cake Inquiry: ${eventType} — ${date}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fffdfb; border: 1px solid #fce7f3; border-radius: 12px;">
          <h1 style="color: #7c2d12; font-size: 24px; margin-bottom: 4px;">🌹 Golden Rose Bakes</h1>
          <p style="color: #be185d; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">New Custom Order Inquiry</p>
          <hr style="border: none; border-top: 1px solid #fce7f3; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Client Name</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px;"><a href="mailto:${email}" style="color: #be185d;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Event Date</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Guest Count</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px;">${servings}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Occasion</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px;">${eventType}</td>
            </tr>
            ${details ? `
            <tr>
              <td style="padding: 8px 0; color: #78716c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Design Notes</td>
              <td style="padding: 8px 0; color: #1c1917; font-size: 15px; line-height: 1.6;">${details.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #fce7f3; margin: 24px 0;" />
          <p style="color: #a8a29e; font-size: 12px; text-align: center;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    req.log.info({ name, eventType, date }, "Cake inquiry email sent");
    res.json({ success: true, message: "Inquiry received! We will be in touch within 48 hours." });
  } catch (err) {
    req.log.error({ err }, "Failed to send inquiry email");
    res.status(500).json({ error: "Failed to send inquiry. Please try again." });
  }
});

export default router;
