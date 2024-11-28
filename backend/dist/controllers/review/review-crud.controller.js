"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updatedReview = exports.getAllReview = exports.createReview = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const router = express_1.default.Router();
// Zod schemas for validation
const reviewSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(255, "Name is too long"),
    description: zod_1.z.string().optional(),
});
const reviewIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid review ID format"),
});
const handleError = (res, error) => {
    console.error("Error:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
};
// 1. Create a new Review
const createReview = async (req, res) => {
    try {
        const validatedData = reviewSchema.parse(req.body);
        const newReview = await prismaClient_1.default.review.create({
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
exports.createReview = createReview;
// 2. Get all Reviews
const getAllReview = async (req, res) => {
    try {
        const reviews = await prismaClient_1.default.review.findMany({
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
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getAllReview = getAllReview;
// 3. Update a Review
const updatedReview = async (req, res) => {
    try {
        const { id } = reviewIdSchema.parse(req.body);
        const validatedData = reviewSchema.partial().parse(req.body);
        const updatedReview = await prismaClient_1.default.review.update({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Review not found" });
        }
        handleError(res, error);
    }
};
exports.updatedReview = updatedReview;
// 4. Delete a Review
const deleteReview = async (req, res) => {
    try {
        const { id } = reviewIdSchema.parse(req.body);
        await prismaClient_1.default.review.delete({
            where: { id },
        });
        return res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Review not found" });
        }
        handleError(res, error);
    }
};
exports.deleteReview = deleteReview;
// Export the router
exports.default = router;
