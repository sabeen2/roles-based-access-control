import { Router } from "express";
import { addNewRole } from "../controllers/manage-roles/add-role.controller";
import { getRoles } from "../controllers/manage-roles/get-roles.controller";
import { deleteRole } from "../controllers/manage-roles/delete-role.controller";

const manageRolesRouter = Router();

manageRolesRouter.post("/add-new-role", addNewRole as any);
manageRolesRouter.post("/delete-role", deleteRole as any);
manageRolesRouter.get("/get-role", getRoles as any);

export default manageRolesRouter;
