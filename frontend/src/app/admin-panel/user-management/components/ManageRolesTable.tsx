import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MoreHorizontal } from "lucide-react";

type Role = {
  id: string;
  name: string;
  permissions: string[];
};

export default function ManageRolesTable() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      permissions: ["Create", "Read", "Update", "Delete"],
    },
    { id: "2", name: "User", permissions: ["Read"] },
    { id: "3", name: "Manager", permissions: ["Read", "Update"] },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const [newPermissions, setNewPermissions] = useState<string[]>([]);

  const availablePermissions = ["Create", "Read", "Update", "Delete"];

  const addNewRole = () => {
    if (newRoleName && newPermissions.length) {
      const newRole: Role = {
        id: String(roles.length + 1),
        name: newRoleName,
        permissions: newPermissions,
      };
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setNewPermissions([]);
    }
  };

  const updateRolePermissions = (
    roleId: string,
    updatedPermissions: string[]
  ) => {
    const updatedRoles = roles.map((role) =>
      role.id === roleId ? { ...role, permissions: updatedPermissions } : role
    );
    setRoles(updatedRoles);
    setSelectedRole(null);
  };

  return (
    <div className="rounded-2xl border border-gray-800/30 overflow-hidden">
      <div className="p-4 border-b border-gray-800/30 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-200">Role Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f0f0f] border-gray-800/50">
            <DialogHeader>
              <DialogTitle className="text-gray-200">Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700"
                placeholder="Role Name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
              <div>
                <label className="text-gray-400">Permissions:</label>
                <div className="flex flex-wrap mt-2 gap-2">
                  {availablePermissions.map((permission) => (
                    <Button
                      key={permission}
                      variant={
                        newPermissions.includes(permission)
                          ? "default"
                          : "ghost"
                      }
                      size="sm"
                      onClick={() =>
                        setNewPermissions((prev) =>
                          prev.includes(permission)
                            ? prev.filter((p) => p !== permission)
                            : [...prev, permission]
                        )
                      }
                    >
                      {permission}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                onClick={addNewRole}
                className="bg-blue-600 hover:bg-blue-500"
                disabled={!newRoleName || newPermissions.length === 0}
              >
                Save Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/30">
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-300"
              >
                <td className="p-4 text-gray-200">{role.name}</td>
                <td className="p-4 text-gray-400">
                  {role.permissions.join(", ")}
                </td>
                <td className="p-4 text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#0f0f0f] border-gray-800/50 text-gray-300"
                      >
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={() => setSelectedRole(role)}
                            className="cursor-pointer hover:bg-gray-800"
                          >
                            Edit Permissions
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="bg-[#0f0f0f] border-gray-800/50">
                      <DialogHeader>
                        <DialogTitle className="text-gray-200">
                          Edit Role Permissions
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-right text-gray-400">
                            Role Name:
                          </span>
                          <span className="col-span-3 text-gray-200">
                            {selectedRole?.name}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-400">Permissions:</label>
                          <div className="flex flex-wrap mt-2 gap-2">
                            {availablePermissions.map((permission) => (
                              <Button
                                key={permission}
                                variant={
                                  selectedRole?.permissions.includes(permission)
                                    ? "default"
                                    : "ghost"
                                }
                                size="sm"
                                onClick={() => {
                                  if (!selectedRole) return;
                                  const updatedPermissions =
                                    selectedRole.permissions.includes(
                                      permission
                                    )
                                      ? selectedRole.permissions.filter(
                                          (p) => p !== permission
                                        )
                                      : [
                                          ...selectedRole.permissions,
                                          permission,
                                        ];
                                  updateRolePermissions(
                                    selectedRole.id,
                                    updatedPermissions
                                  );
                                }}
                              >
                                {permission}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
