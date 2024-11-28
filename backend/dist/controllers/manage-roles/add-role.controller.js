"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewRole = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const addNewRole = async (req, res) => {
    const { name, permissions } = req.body;
    // Validate input data
    if (!name || typeof name !== "string") {
        return res
            .status(400)
            .json({ success: false, message: "Invalid or missing 'name'" });
    }
    if (!permissions || !Array.isArray(permissions)) {
        return res
            .status(400)
            .json({ success: false, message: "'permissions' must be an array" });
    }
    try {
        // Check if the role name already exists
        const existingRole = await prismaClient_1.default.role.findUnique({
            where: { name },
        });
        if (existingRole) {
            return res.status(409).json({
                success: false,
                message: "Role with this name already exists",
            });
        }
        // Create the new role
        const newRole = await prismaClient_1.default.role.create({
            data: {
                name,
                permissions: {
                    create: permissions.map((perm) => ({
                        sideBarItem: perm.sideBarItem,
                        canCreate: perm.canCreate || false,
                        canRead: perm.canRead !== false,
                        canUpdate: perm.canUpdate || false,
                        canDelete: perm.canDelete || false,
                    })),
                },
            },
            select: {
                id: true,
                name: true,
            },
        });
        res.status(201).json({
            success: true,
            message: "Role Added Sucessfully",
            data: newRole,
        });
    }
    catch (error) {
        console.error("Error adding role:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.addNewRole = addNewRole;
