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

  const { name, phone, date, quantity, orderType, details } = parsed.data;

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
      from: `"Golden Rose Bakes" <${adminEmail}>`,
      to: adminEmail,
      subject: `🌹 طلب حجز جديد: ${orderType} — ${date}`,
      html: `
        <div style="font-family: Georgia, serif; direction: rtl; max-width: 600px; margin: 0 auto; padding: 32px; background: #fffdfb; border: 1px solid #fce7f3; border-radius: 12px;">
          <h1 style="color: #7c2d12; font-size: 24px; margin-bottom: 4px;">🌹 Golden Rose Bakes</h1>
          <p style="color: #be185d; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">طلب حجز جديد</p>
          <hr style="border: none; border-top: 1px solid #fce7f3; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px; width: 160px;">اسم العميل</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px;">رقم الهاتف</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px;"><a href="tel:${phone}" style="color: #be185d;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px;">تاريخ المناسبة</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px;">الكمية التقريبية</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px;">نوع الطلبية</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px;">${orderType}</td>
            </tr>
            ${details ? `
            <tr>
              <td style="padding: 10px 0; color: #78716c; font-size: 12px; vertical-align: top;">تفاصيل إضافية</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 15px; line-height: 1.7;">${details.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #fce7f3; margin: 24px 0;" />
          <p style="color: #a8a29e; font-size: 12px; text-align: center;">تواصل مع العميل مباشرة على الرقم أعلاه لتأكيد الطلبية.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    req.log.info({ name, orderType, date }, "Cake inquiry email sent");
    res.json({ success: true, message: "تم استلام طلبكم! سنتواصل معكم في أقرب وقت." });
  } catch (err) {
    req.log.error({ err }, "Failed to send inquiry email");
    res.status(500).json({ error: "Failed to send inquiry. Please try again." });
  }
});

export default router;
