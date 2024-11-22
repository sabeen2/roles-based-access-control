import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user: {
    id: string;
    email: string;
    password: string;
  };
}

export default async function changeUserPassword(
  req: CustomRequest,
  res: Response | any
): Promise<any> {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const { id, password: hashedPassword } = req.user;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmNewPassword ||
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmNewPassword !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    if (newPassword.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      hashedPassword
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, hashedPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the current password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: newHashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in updateUserPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
