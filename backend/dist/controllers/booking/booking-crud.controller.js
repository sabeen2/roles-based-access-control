"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updatedBooking = exports.getAllBooking = exports.createBooking = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const router = express_1.default.Router();
// Zod schemas for validation
const bookingSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(255, "Name is too long"),
    description: zod_1.z.string().optional(),
});
const bookingIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid booking ID format"),
});
const handleError = (res, error) => {
    console.error("Error:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
};
// 1. Create a new Booking
const createBooking = async (req, res) => {
    try {
        const validatedData = bookingSchema.parse(req.body);
        const newBooking = await prismaClient_1.default.booking.create({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        handleError(res, error);
    }
};
exports.createBooking = createBooking;
// 2. Get all Bookings
const getAllBooking = async (req, res) => {
    try {
        const bookings = await prismaClient_1.default.booking.findMany({
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
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getAllBooking = getAllBooking;
// 3. Update a Booking
const updatedBooking = async (req, res) => {
    try {
        const { id } = bookingIdSchema.parse(req.body);
        const validatedData = bookingSchema.partial().parse(req.body);
        const updatedBooking = await prismaClient_1.default.booking.update({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Booking not found" });
        }
        handleError(res, error);
    }
};
exports.updatedBooking = updatedBooking;
// 4. Delete a Booking
const deleteBooking = async (req, res) => {
    try {
        const { id } = bookingIdSchema.parse(req.body);
        await prismaClient_1.default.booking.delete({
            where: { id },
        });
        return res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Booking not found" });
        }
        handleError(res, error);
    }
};
exports.deleteBooking = deleteBooking;
// Export the router
exports.default = router;
