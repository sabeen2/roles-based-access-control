import { Router } from "express";
import signup from "../controllers/auth/signup.controller";
import login from "../controllers/auth/login.controller";
import verifyEmail from "../controllers/auth/verify-email.controller";
import forgotPassword from "../controllers/auth/forget-password.controller";
import resetPassword from "../controllers/auth/reset-password.controller";
import protectedRoute from "../middlewares/protectedRoute.middleware";

const authRouter = Router();

// Setup route handler
authRouter.post("/signup", signup);
authRouter.post("/login", login);
// authRouter.post("/verify-email", protectedRoute, verifyEmail);
// authRouter.post("/forget-password", forgotPassword);
// authRouter.post("/reset-password", resetPassword);

export default authRouter;
