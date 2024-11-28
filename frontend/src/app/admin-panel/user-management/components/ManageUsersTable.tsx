import React, { useState, useEffect, useMemo } from "react";

import { Switch } from "@/components/ui/switch";
import {
  useDeleteRestrictUser,
  useGetAllUsers,
} from "@/api/user-management/queries";
import { message } from "antd";
import DeleteModal from "./DeleteModal";
import EditUserDialog from "./EditUserDialog";

type Role = {
  id: string;
  name: string;
};

type User = {
  id: string;
  fullName: string;
  email: string;
  restricted: boolean;
  role: Role;
};

export default function ManageUsersTable() {
  const { data: getAllUserData, refetch: refetchAllUsers } = useGetAllUsers();
  const { mutate: deleteOrRestrictUser } = useDeleteRestrictUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Extract unique roles from the users data
  const uniqueRoles: any = useMemo(() => {
    if (!getAllUserData) return [];
    const roles = getAllUserData.users.map(
      (user: { role: string; id: string }) => user.role
    );
    return Array.from(
      new Map(roles.map((role: { id: string }) => [role.id, role])).values()
    );
  }, [getAllUserData]);

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      let payload = {
        userId: userToDelete,
        deleteUser: true,
      };
      deleteOrRestrictUser(payload, {
        onSuccess: () => {
          message.success(`Deleted User Successfully`);
          refetchAllUsers();
          setDeleteDialogOpen(false);
        },
        onError: (err) => {
          message.error(`Failed: ${err}`);
        },
      });
    }
  };

  const handleStatusChange = (id: string, restricted: boolean) => {
    let payload = {
      userId: id,
      restrictUser: !restricted,
    };
    deleteOrRestrictUser(payload, {
      onSuccess: () => {
        message.success(
          `${
            restricted
              ? "Activated User Account Successfully"
              : "Deactivated User Account Successfully"
          }`
        );
        refetchAllUsers();
      },
      onError: (err) => {
        message.error(`Failed: ${err}`);
      },
    });
  };

  useEffect(() => {
    if (selectedUser) {
      setSelectedRole(selectedUser.role.id); // Ensure the role ID is set properly when editing
    }
  }, [selectedUser]);

  return (
    <div className="rounded-2xl border border-gray-800/30 overflow-hidden">
      <div className="p-4 border-b border-gray-800/30">
        <h2 className="text-xl font-semibold text-gray-200">User List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/30 ">
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllUserData?.users?.map((user: any) => (
              <tr
                key={user.id}
                className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-300"
              >
                <td className="p-4 text-gray-200">{user.fullName}</td>
                <td className="p-4 text-gray-400">{user.email}</td>
                <td className="p-4">
                  <span
                    className="
                      bg-blue-900/30 
                      text-blue-300 
                      px-3 py-1 
                      rounded-full 
                      text-xs 
                      font-medium
                    "
                  >
                    {user.role.name}
                  </span>
                </td>
                <td className="p-4">
                  <Switch
                    checked={!user.restricted}
                    onCheckedChange={() =>
                      handleStatusChange(user.id, user.restricted)
                    }
                    className={`bg-gray-700 dark:bg-gray-800 transition-colors ${
                      !user.restricted ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full ${
                        user.restricted ? "bg-red-500" : "bg-gray-400"
                      }`}
                    />
                  </Switch>
                </td>

                <td className="p-4 text-right">
                  <EditUserDialog
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleDeleteUser={handleDeleteUser}
                    user={user}
                    setSelectedRole={setSelectedRole}
                    selectedRole={selectedRole}
                    uniqueRoles={uniqueRoles}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmDeleteUser={confirmDeleteUser}
      />
    </div>
  );
}
