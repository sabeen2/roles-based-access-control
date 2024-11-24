import { Router } from "express";
import { addNewRole } from "../controllers/manage-roles/add-role.controller";
import { deleteRole } from "../controllers/manage-roles/delete-role.controller";
import protectedRoute from "../middlewares/protectedRoute.middleware";
import { getAllRoles } from "../controllers/manage-roles/get-all-roles.controller";
import { editRole } from "../controllers/manage-roles/edit-roles.controller";
import changeUserRole from "../controllers/manage-roles/change-role.controller";
import getAllUsers from "../controllers/manage-roles/get-all-users.controller";
import deleteRestrictUser from "../controllers/manage-roles/delete-restrict-user.controller";

const manageRolesRouter = Router();
manageRolesRouter.use(protectedRoute);

manageRolesRouter.post("/add-new-role", addNewRole);
manageRolesRouter.post("/delete-role", deleteRole);
manageRolesRouter.get("/get-all-roles", getAllRoles);
manageRolesRouter.post("/edit-role", editRole);
manageRolesRouter.post("/assign-role", changeUserRole);
manageRolesRouter.get("/get-all-users", getAllUsers);
manageRolesRouter.post("/user-action", deleteRestrictUser);

export default manageRolesRouter;
