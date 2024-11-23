import { Router } from "express";
import signup from "../controllers/auth/signup.controller";
import login from "../controllers/auth/login.controller";

import protectedRoute from "../middlewares/protectedRoute.middleware";

const authRouter = Router();

// Setup route handler
authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
