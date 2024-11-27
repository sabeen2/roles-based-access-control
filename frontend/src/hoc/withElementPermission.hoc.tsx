import { useGetUserRole } from "@/api/userAuth/queries";
import React from "react";

interface Permission {
  id: string;
  sideBarItem: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface UserPermissions {
  userId: string;
  fullName: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: Permission[];
  };
}

interface PermissionWrapperProps {
  children: JSX.Element;
  componentName: "Authors" | "Reviews" | "Bookings" | "ManageUsers";
  operationType: "create" | "read" | "update" | "delete";
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  children,
  componentName,
  operationType,
}) => {
  const { data: userRolesData, isLoading: loadingUserRoles } = useGetUserRole();
  const permissions = userRolesData.data.role.permissions;

  const permission = permissions.find(
    (p: any) => p.sideBarItem === componentName
  );

  if (permission) {
    switch (operationType) {
      case "create":
        if (!permission.canCreate) return null;
        break;
      case "read":
        if (!permission.canRead) return null;
        break;
      case "update":
        if (!permission.canUpdate) return null;
        break;
      case "delete":
        if (!permission.canDelete) return null;
        break;
      default:
        return null;
    }
  }

  return children;
};

export default PermissionWrapper;
