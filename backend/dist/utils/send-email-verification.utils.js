"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendVerificationEmail = async ({ email, verificationCode, }) => {
    try {
        const mailOptions = {
            from: `"Insight Work" <no-reply@insightwork.com>`,
            to: email,
            subject: "Your Verification Code",
            html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Code</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
                <div style="
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 12px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  font-family: 'Segoe UI', Arial, sans-serif;
                ">
                  <!-- Header -->
                  <div style="
                    background-color: #4F46E5;
                    padding: 32px 24px;
                    text-align: center;
                  ">
                    <h1 style="
                      color: #ffffff;
                      margin: 0;
                      font-size: 24px;
                      font-weight: 600;
                    ">Verify Your Email</h1>
                  </div>
      
                  <!-- Content -->
                  <div style="padding: 32px 24px; text-align: center;">
                    <p style="
                      color: #374151;
                      font-size: 16px;
                      line-height: 24px;
                      margin: 0 0 24px 0;
                    ">Here's your verification code:</p>
      
                    <div style="
                      background-color: #F3F4F6;
                      border-radius: 8px;
                      padding: 16px;
                      margin: 0 auto 24px auto;
                      max-width: 240px;
                    ">
                      <h2 style="
                       
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: 4px;
                        margin: 0;
                       
                      ">${verificationCode}</h2>
                    </div>
      
                    <p style="
                      color: #374151;
                      font-size: 16px;
                      line-height: 24px;
                      margin: 0 0 24px 0;
                    ">
                      Please enter this code to complete your verification.
                      <br>
                      <strong style="color: #4B5563;">This code will expire in 24 hours.</strong>
                    </p>
      
                    <div style="
                      background-color: #F9FAFB;
                      border-radius: 8px;
                      padding: 16px;
                      margin-top: 32px;
                    ">
                      <p style="
                        color: #6B7280;
                        font-size: 14px;
                        line-height: 20px;
                        margin: 0;
                      ">
                        If you didn't request this code, please ignore this email or contact support if you have concerns.
                      </p>
                    </div>
                  </div>
      
                  <!-- Footer -->
                  <div style="
                    border-top: 1px solid #E5E7EB;
                    padding: 24px;
                    text-align: center;
                  ">
                    <p style="
                      color: #9CA3AF;
                      font-size: 12px;
                      margin: 0;
                    ">
                      © ${new Date().getFullYear()} Insight Work. All rights reserved.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        };
        // Send email
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
