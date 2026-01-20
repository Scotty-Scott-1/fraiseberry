import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    await resend.emails.send({
      from: "Verification <verification@training.fraiseberry.com>",
      to,
      subject,
      html: html || text,
    });
    return { status: 200, message: "email sent" };
  } catch (err) {
    console.error(err);
    throw new Error("Email not sent", { cause: err })
  }
};
