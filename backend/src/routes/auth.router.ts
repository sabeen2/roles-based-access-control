import { Router } from "express";
import signup from "../controllers/auth/signup.controller";
import login from "../controllers/auth/login.controller";

import logoutUser from "../controllers/auth/logout.controller";

const authRouter = Router();

// Setup route handler
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logoutUser);

export default authRouter;
