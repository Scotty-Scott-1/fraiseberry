import { sendMail } from "../../email/resendMailer.js";

export const sendVerificationEmail = async (user) => {

  const baseUrl = "http://localhost:5173";
  const verificationLink = `${baseUrl}/email?token=${user.verificationToken}`;

  try {
    await sendMail({
      to: user.email,
      subject: "Verify your account",
      text:`
        Hello,
        Thanks for signing up to commit.
        Please verify your account: ${verificationLink}
        Kind regards,
        commit`,
      html: `
        <p>Hello,</p>
        <p>Thanks for signing up to commit.</p>
        <p>Please verify your account: ${verificationLink}</p>
        <p>Kind regards,</p>
        <p>commit</p>`
      });

  } catch (err) {
    console.error(err)
    throw new Error("Email verification email failed to send", {cause: err });
  }
};
