import { Request, Response } from "express";

import prisma from "../../../prisma/prismaClient";

const changeUserRole = async (req: Request, res: Response): Promise<any> => {
  const { userId, roleId } = req.body;

  if (!userId || !roleId) {
    return res
      .status(400)
      .json({ success: false, message: "userId and roleId are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { roleId },
      include: { role: true }, // Include the updated role details
    });

    return res.status(200).json({
      success: true,
      message: "Role assignedsuccessfully",
    });
  } catch (error) {
    console.error("Error assigning role:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default changeUserRole;
