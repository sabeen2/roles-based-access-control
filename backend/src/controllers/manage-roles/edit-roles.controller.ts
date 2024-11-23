import { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";
import { SidebarItemsEnum } from "../../schema/manage-users.schema";

interface UpdatePermission {
  sideBarItem: SidebarItemsEnum; // Must match SidebarItemsEnum
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface EditRoleRequestBody {
  roleId: string;
  name: string;
  permissions: UpdatePermission[];
}

export const editRole = async (req: Request, res: Response): Promise<any> => {
  const { roleId, name, permissions } = req.body as EditRoleRequestBody;

  if (!roleId || !name || !permissions || !Array.isArray(permissions)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request. Missing or incorrect fields.",
    });
  }

  try {
    const sideBarItemsEnum = ["Authors", "Bookings", "Reviews", "ManageUsers"];
    const providedItems = permissions.map((perm) => perm.sideBarItem);

    // Validate that no extra or missing sideBarItems are provided
    const missingItems = sideBarItemsEnum.filter(
      (item) => !providedItems.includes(item as any)
    );
    const extraItems = providedItems.filter(
      (item) => !sideBarItemsEnum.includes(item)
    );

    if (missingItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing permissions for: ${missingItems.join(", ")}`,
      });
    }

    if (extraItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid sideBarItems provided: ${extraItems.join(", ")}`,
      });
    }

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    // Update role name
    await prisma.role.update({
      where: { id: roleId },
      data: { name },
    });

    // Upsert permissions (update if exists, create if not)
    const permissionUpdates = permissions.map((permission) =>
      prisma.permission.upsert({
        where: {
          roleId_sideBarItem: {
            roleId,
            sideBarItem: permission.sideBarItem,
          },
        },
        update: {
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        },
        create: {
          roleId,
          sideBarItem: permission.sideBarItem,
          canCreate: permission.canCreate,
          canRead: permission.canRead,
          canUpdate: permission.canUpdate,
          canDelete: permission.canDelete,
        },
      })
    );

    // Execute permission updates
    await Promise.all(permissionUpdates);

    return res.status(200).json({
      success: true,
      message: "Role and permissions updated successfully.",
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
