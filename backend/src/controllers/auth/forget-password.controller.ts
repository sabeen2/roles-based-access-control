import { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";
import { forgotPasswordSchema } from "../../schema/forgot-password.schema";
import { sendPasswordResetMail } from "../../utils/send-password-reset-mail";
import { generateVerificationCode } from "../../utils/generate-verification-opt.utils";

export default async function forgotPassword(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Missing email address.",
      });
    }

    const validatedData = forgotPasswordSchema.safeParse(req.body);
    if (validatedData.error) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed. Invalid Email",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User for the provided email not found",
      });
    }

    const tokenExpiry = Date.now() + 60 * 60 * 1000;
    const resetToken = generateVerificationCode();
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpiresAt: new Date(tokenExpiry),
      },
    });

    await sendPasswordResetMail({ email, resetPasswordToken: resetToken });

    return res.status(200).json({
      success: true,
      message: "Reset Token sent successfully, please check your email",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
