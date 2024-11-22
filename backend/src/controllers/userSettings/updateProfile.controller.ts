import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface customRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export default async function updateUserProfile(
  req: customRequest,
  res: Response | any
): Promise<any> {
  try {
    const { fullName } = req.body;
    const { id, email } = req.user;

    if (!id || !email) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });
    }

    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid name provided" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { fullName },
    });

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: {
        fullName: updatedUser.fullName,
      },
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
