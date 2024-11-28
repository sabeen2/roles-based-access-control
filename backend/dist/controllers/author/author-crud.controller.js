"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updatedAuthor = exports.getAllAuthor = exports.createAuthor = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const router = express_1.default.Router();
// Zod schemas for validation
const authorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(255, "Name is too long"),
    about: zod_1.z.string().optional(),
});
const authorIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid author ID format"),
});
const handleError = (res, error) => {
    console.error("Error:", error);
    res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
};
// 1. Create a new Author
const createAuthor = async (req, res) => {
    try {
        const validatedData = authorSchema.parse(req.body);
        const newAuthor = await prismaClient_1.default.author.create({
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
exports.createAuthor = createAuthor;
// 2. Get all Authors
const getAllAuthor = async (req, res) => {
    try {
        const authors = await prismaClient_1.default.author.findMany({
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
    }
    catch (error) {
        handleError(res, error);
    }
};
exports.getAllAuthor = getAllAuthor;
// 3. Update a Author
const updatedAuthor = async (req, res) => {
    try {
        const { id } = authorIdSchema.parse(req.body);
        const validatedData = authorSchema.partial().parse(req.body);
        const updatedAuthor = await prismaClient_1.default.author.update({
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
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Author not found" });
        }
        handleError(res, error);
    }
};
exports.updatedAuthor = updatedAuthor;
// 4. Delete a Author
const deleteAuthor = async (req, res) => {
    try {
        const { id } = authorIdSchema.parse(req.body);
        await prismaClient_1.default.author.delete({
            where: { id },
        });
        return res.status(200).json({ message: "Author deleted successfully" });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Author not found" });
        }
        handleError(res, error);
    }
};
exports.deleteAuthor = deleteAuthor;
// Export the router
exports.default = router;
