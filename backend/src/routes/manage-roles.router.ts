import { Router } from "express";
import { addNewRole } from "../controllers/manage-roles/add-role.controller";
import { getUserRoles } from "../controllers/manage-roles/get-user-roles.controller";
import { deleteRole } from "../controllers/manage-roles/delete-role.controller";
import protectedRoute from "../middlewares/protectedRoute.middleware";
import { getAllRoles } from "../controllers/manage-roles/get-all-roles.controller";
import { editRole } from "../controllers/manage-roles/edit-roles.controller";
import changeUserRole from "../controllers/manage-roles/change-role.controller";

const manageRolesRouter = Router();

manageRolesRouter.post("/add-new-role", protectedRoute, addNewRole);
manageRolesRouter.post("/delete-role", protectedRoute, deleteRole);
manageRolesRouter.get("/get-all-roles", protectedRoute, getAllRoles);
manageRolesRouter.post("/edit-role", protectedRoute, editRole);
manageRolesRouter.post("/assign-role", protectedRoute, changeUserRole);

export default manageRolesRouter;
