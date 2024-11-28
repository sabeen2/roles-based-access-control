"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = void 0;
const zod_1 = require("zod");
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string().min(8),
    email: zod_1.z.string().email(),
    resetPasswordToken: zod_1.z.string().length(6),
});
