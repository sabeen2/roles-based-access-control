import express, { Request, Response } from "express";
import { z } from "zod";
import prisma from "../../utils/prismaClient";

const router = express.Router();

// Zod schemas for validation
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  description: z.string().optional(),
});

const bookingIdSchema = z.object({
  id: z.string().uuid("Invalid booking ID format"),
});

const handleError = (res: Response, error: any) => {
  console.error("Error:", error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};

// 1. Create a new Booking
export const createBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const validatedData = bookingSchema.parse(req.body);

    const newBooking = await prisma.booking.create({
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
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    handleError(res, error);
  }
};

// 2. Get all Bookings
export const getAllBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// 3. Update a Booking
export const updatedBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = bookingIdSchema.parse(req.body);
    const validatedData = bookingSchema.partial().parse(req.body);

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    return res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Booking not found" });
    }
    handleError(res, error);
  }
};

// 4. Delete a Booking
export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = bookingIdSchema.parse(req.body);

    await prisma.booking.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    if ((error as any).code === "P2025") {
      return res.status(404).json({ message: "Booking not found" });
    }
    handleError(res, error);
  }
};

// Export the router
export default router;
