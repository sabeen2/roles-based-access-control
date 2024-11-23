import { Router } from "express";
import { addNewRole } from "../controllers/manage-roles/add-role.controller";
import { getRoles } from "../controllers/manage-roles/get-roles.controller";
import { deleteRole } from "../controllers/manage-roles/delete-role.controller";
import protectedRoute from "../middlewares/protectedRoute.middleware";

const manageRolesRouter = Router();

manageRolesRouter.post("/add-new-role", protectedRoute, addNewRole as any);
manageRolesRouter.post("/delete-role", protectedRoute, deleteRole as any);
manageRolesRouter.get("/get-role", protectedRoute, getRoles as any);

export default manageRolesRouter;
