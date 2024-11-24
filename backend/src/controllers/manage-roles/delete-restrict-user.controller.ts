import express, { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

const deleteRestrictUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, deleteUser, restrictUser } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch the user to ensure they exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If deleteUser is true, delete the user permanently
    if (deleteUser) {
      await prisma.user.delete({
        where: { id: userId },
      });
      return res.status(200).json({ message: "User deleted permanently" });
    }

    // If restrictUser is true, update the restricted field to true
    if (restrictUser) {
      await prisma.user.update({
        where: { id: userId },
        data: { restricted: true },
      });
      return res.status(200).json({ message: "User restricted successfully" });
    }

    // If neither action is specified, return an error
    return res.status(400).json({ error: "No valid action provided" });
  } catch (error) {
    console.error("Error handling user action:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deleteRestrictUser;
