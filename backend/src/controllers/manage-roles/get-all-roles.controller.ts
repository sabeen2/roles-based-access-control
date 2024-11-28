import express, { Request, Response } from "express";
import prisma from "../../utils/prismaClient";

export const getAllRoles = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const roles = await prisma.role.findMany({
      where: { isDeleted: false },
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
            roleId: true,
          },
        },
      },
    });

    if (!roles.length) {
      return res
        .status(404)
        .json({ success: false, message: "No roles found" });
    }

    // Send response with filtered data
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
