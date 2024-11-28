"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = login;
const user_login_schema_1 = require("../../schema/user-login.schema");
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const cookie_methods_utils_1 = __importDefault(require("../../utils/cookie-methods.utils"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import rateLimiter from "../../utils/rate-limiter.utils";
async function login(req, res) {
    // Validate request data
    const validatedData = user_login_schema_1.userLoginSchema.safeParse(req.body);
    if (validatedData.error) {
        return res.status(400).json({
            success: false,
            message: "Unsupported Data Type or length less that 6 digits",
        });
    }
    const { email, password } = req.body;
    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields.",
        });
    }
    try {
        // Fetch user from database
        const user = await prismaClient_1.default.user.findFirst({
            where: { email },
            select: {
                email: true,
                fullName: true,
                password: true,
                isDeleted: true,
                restricted: true,
            },
        });
        // Check if user exists
        if (!user || user.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "User does not exist.",
            });
        }
        // Check if user is restricted
        if (user.restricted) {
            return res.status(403).json({
                success: false,
                message: "Your account is deactivated. Please contact admin.",
            });
        }
        // Validate password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password. Please try again.",
            });
        }
        // Generate JWT token and set cookie
        const token = cookie_methods_utils_1.default.generateJWT(user.email);
        // CookieMethods.setCookie(res, token, 7);
        // Successful login response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            data: {
                email: user.email,
                fullName: user.fullName,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
