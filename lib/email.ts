import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

export const sendOTP = async (to: string, otp: string) => {
  const subject = "Your One-Time Password (OTP)";
  const text = `Your OTP code is: ${otp}. It will expire in 10 minutes.`;

  await sendEmail(to, subject, text);
};