import express, { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

export const getRoles = async (_req: Request, res: Response) => {
  try {
    // Fetch roles and their permissions, excluding unwanted fields
    const roles = await prisma.role.findMany({
      where: { isDeleted: false }, // Filter out deleted roles
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
          }, // Select only the fields needed for permissions
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
