import express, { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prismaClient";

const router = express.Router();

// Zod schemas for validation
const reviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().optional(),
});

const reviewIdSchema = z.object({
  id: z.string().uuid("Invalid review ID format"),
});

const handleError = (res: Response, error: any) => {
  console.error("Error:", error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};

// 1. Create a new Review
export const createReview = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validatedData = reviewSchema.parse(req.body);

    const newReview = await prisma.review.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || "",
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    handleError(res, error);
  }
};

// 2. Get all Reviews
export const getAllReview = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// 3. Update a Review
export const updatedReview = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = reviewIdSchema.parse(req.body);
    const validatedData = reviewSchema.partial().parse(req.body);

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    return res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Review not found" });
    }
    handleError(res, error);
  }
};

// 4. Delete a Review
export const deleteReview = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = reviewIdSchema.parse(req.body);

    await prisma.review.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Review not found" });
    }
    handleError(res, error);
  }
};

// Export the router
export default router;
