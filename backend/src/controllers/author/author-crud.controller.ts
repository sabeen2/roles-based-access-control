import express, { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prismaClient";

const router = express.Router();

// Zod schemas for validation
const authorSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  about: z.string().optional(),
});

const authorIdSchema = z.object({
  id: z.string().uuid("Invalid author ID format"),
});

const handleError = (res: Response, error: any) => {
  console.error("Error:", error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};

// 1. Create a new Author
export const createAuthor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validatedData = authorSchema.parse(req.body);

    const newAuthor = await prisma.author.create({
      data: {
        name: validatedData.name,
        about: validatedData.about || "",
      },
      select: {
        id: true,
        name: true,
        about: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Author created successfully", author: newAuthor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    handleError(res, error);
  }
};

// 2. Get all Authors
export const getAllAuthor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authors = await prisma.author.findMany({
      select: {
        id: true,
        name: true,
        about: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: authors,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// 3. Update a Author
export const updatedAuthor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = authorIdSchema.parse(req.body);
    const validatedData = authorSchema.partial().parse(req.body);

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        name: validatedData.name,
        about: validatedData.about,
      },
    });

    return res.status(200).json({
      message: "Author updated successfully",
      author: updatedAuthor,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Author not found" });
    }
    handleError(res, error);
  }
};

// 4. Delete a Author
export const deleteAuthor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = authorIdSchema.parse(req.body);

    await prisma.author.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Author not found" });
    }
    handleError(res, error);
  }
};

// Export the router
export default router;
