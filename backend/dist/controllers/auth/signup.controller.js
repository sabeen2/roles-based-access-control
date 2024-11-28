"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = signup;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const user_signup_schema_1 = require("../../schema/user-signup.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_methods_utils_1 = __importDefault(require("../../utils/cookie-methods.utils"));
async function signup(req, res) {
    try {
        const validatedData = user_signup_schema_1.userSignupSchema.safeParse(req.body);
        if (validatedData.error) {
            return res.status(400).json({
                success: false,
                message: "Unsupported Data Type or length less that 6 digits",
            });
        }
        const { email, fullName, password, confirmPassword } = req.body;
        if (!email || !fullName || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields.",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }
        // Password validation rules
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Include at least one uppercase letter, one lowercase letter, one number, and one special character.",
            });
        }
        // Check if user already exists
        const existingUser = await prismaClient_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "A user with this email already exists.",
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Find the 'User' role or create one if it doesn't exist
        const userRole = await prismaClient_1.default.role.findUnique({
            where: { name: "User" },
        });
        if (!userRole) {
            return res.status(400).json({
                success: false,
                message: "Role 'User' not found in the database. Please contact the admin.",
            });
        }
        // Create new user with the 'User' role
        const newUser = await prismaClient_1.default.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword,
                roleId: userRole.id, // Assign the 'User' role
            },
            select: {
                fullName: true,
                email: true,
            },
        });
        // Generate JWT token and set cookie
        const cookie = cookie_methods_utils_1.default.generateJWT(newUser.email);
        // CookieMethods.setCookie(res, cookie, 7);
        return res.status(201).json({
            success: true,
            message: "Signup successful. ",
            cookie,
            data: newUser,
        });
    }
    catch (err) {
        console.error(err); // For debugging purposes
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
        });
    }
}
