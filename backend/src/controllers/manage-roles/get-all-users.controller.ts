import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";

const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        fullName: true,
        email: true,
        restricted: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export default getAllUsers;
