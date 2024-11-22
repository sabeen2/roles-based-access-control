import { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

interface customRequest extends Request {
  user: {
    email: string;
  };
}

export default async function verifyEmail(
  req: customRequest,
  res: Response | any
): Promise<any> {
  try {
    const { verificationCode } = req.body;
    const email = req?.user?.email;

    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email or verification code.",
      });
    }

    if (typeof verificationCode !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid data type for verification code. Expected a string.",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email, verificationCode },
      select: {
        email: true,
        fullName: true,
        isVerified: true,
        verificationCodeExpiresAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid verification code or email.",
      });
    }

    if (user.isVerified) {
      return res.status(409).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    if (
      user.verificationCodeExpiresAt &&
      user.verificationCodeExpiresAt < new Date()
    ) {
      await prisma.user.update({
        where: { email: user.email },
        data: {
          verificationCode: null,
          verificationCodeExpiresAt: null,
        },
      });

      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new one.",
      });
    }

    await prisma.user.update({
      where: { email: user.email },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
