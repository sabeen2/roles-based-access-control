import { Request, Response } from "express";
import { resetPasswordSchema } from "../../schema/forgot-password.schema";
import prisma from "../../../prisma/prismaClient";
import bcrypt from "bcrypt";

export default async function resetPassword(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { email, password, confirmPassword, resetPasswordToken } = req.body;

    if (!email || !password || !confirmPassword || !resetPasswordToken) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const validatedData = resetPasswordSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed. Invalid data.",
      });
    }

    const user = await prisma.user.findFirst({
      where: { email, resetPasswordToken },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or invalid reset token.",
      });
    }

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < new Date()
    ) {
      await prisma.user.update({
        where: { email },
        data: {
          resetPasswordToken: null,
          resetPasswordTokenExpiresAt: null,
        },
      });

      return res.status(400).json({
        success: false,
        message: "Reset token has expired. Please request a new one.",
      });
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
