import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ==================== SEND VERIFICATION EMAIL ====================
export const sendVerificationEmail = async (email, username, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"DevBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - DevBlog",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to DevBlog! 🚀</h2>
        <p>Hi ${username},</p>
        <p>Thanks for signing up! Please verify your email address to get started.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #4b5563; word-break: break-all;">${verificationUrl}</p>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This link will expire in 24 hours.
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Email send error:", error);
    return false;
  }
};

// ==================== SEND PASSWORD RESET EMAIL ====================
export const sendPasswordResetEmail = async (email, username, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"DevBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password - DevBlog",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Reset Your Password 🔑</h2>
        <p>Hi ${username},</p>
        <p>We received a request to reset your password. Click the button below to reset it.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #4b5563; word-break: break-all;">${resetUrl}</p>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          This link will expire in 1 hour.
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Password reset email send error:", error);
    return false;
  }
};

// ==================== TEST EMAIL CONFIGURATION ====================
export const testEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email configured successfully");
    return true;
  } catch (error) {
    console.error("❌ Email configuration error:", error);
    return false;
  }
};