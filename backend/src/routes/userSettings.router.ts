import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.middleware";
import updateUserProfile from "../controllers/userSettings/updateProfile.controller";
import changeUserPassword from "../controllers/userSettings/changePassword.controller";

const userSettingRouter = Router();

userSettingRouter.post("/update-profile", protectedRoute, updateUserProfile);
userSettingRouter.post("/change-password", protectedRoute, changeUserPassword);

export default userSettingRouter;
