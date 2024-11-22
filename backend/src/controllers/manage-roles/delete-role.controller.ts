import express, { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.body;

  // Validate input
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Role ID is required" });
  }

  try {
    // Check if the role exists
    const role = await prisma.role.findUnique({ where: { id } });

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    // Delete the role
    await prisma.role.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
