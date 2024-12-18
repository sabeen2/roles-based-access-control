import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";

interface CustomRequest extends Request {
  user: { email: string };
}

export const getUserRoles = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.user;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                id: true,
                sideBarItem: true,
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
              },
            },
          },
        },
      },
    });

    // Handle case if user is not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the user role and permissions as a response
    res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
