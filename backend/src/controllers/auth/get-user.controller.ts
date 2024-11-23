import { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

interface customRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export default async function getUser(
  req: customRequest,
  res: Response | any
): Promise<any> {
  try {
    const { email } = req?.user;

    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        fullName: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
