"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = __importDefault(require("../controllers/auth/signup.controller"));
const login_controller_1 = __importDefault(require("../controllers/auth/login.controller"));
const logout_controller_1 = __importDefault(require("../controllers/auth/logout.controller"));
const authRouter = (0, express_1.Router)();
// Setup route handler
authRouter.post("/signup", signup_controller_1.default);
authRouter.post("/login", login_controller_1.default);
authRouter.post("/logout", logout_controller_1.default);
exports.default = authRouter;
