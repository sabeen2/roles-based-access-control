import express, { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

const deleteRestrictUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, deleteUser, restrictUser } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, error: "User ID is required" });
  }

  try {
    // Fetch the user to ensure they exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check if the user's email is the protected admin email
    if (user.email === "admin@yopmail.com") {
      return res.status(403).json({
        success: false,
        error:
          "Cannot restrict or delete the original admin, may lead to problems.",
      });
    }

    // If deleteUser is true, delete the user permanently
    if (deleteUser) {
      await prisma.user.delete({
        where: { id: userId },
      });
      return res
        .status(200)
        .json({ success: true, message: "User deleted sucessfully" });
    }

    // If restrictUser is true, update the restricted field to true
    if (restrictUser) {
      await prisma.user.update({
        where: { id: userId },
        data: { restricted: true },
      });
      return res
        .status(200)
        .json({ success: true, message: "User restricted successfully" });
    }

    // If neither action is specified, return an error
    return res
      .status(400)
      .json({ success: false, error: "No valid action provided" });
  } catch (error) {
    console.error("Error handling user action:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export default deleteRestrictUser;