import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpRight, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { message } from "antd";
import DeleteModal from "./DeleteModal";
import {
  useDeleteRestrictUser,
  useGetAllUsers,
} from "@/api/user-management/queries";
import EditUserDialog from "./EditUserDialog"; // Import the new EditUserDialog component

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

  const availableRoles = [
    { id: "91ac4010-168b-43ba-b23b-6e6377ba2e33", name: "User" },
    { id: "admin-role-id", name: "Admin" },
    { id: "manager-role-id", name: "Manager" },
  ];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

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
          message.success(`Deleted User Sucessfully`);
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
              ? "Activated User Account Sucessfully"
              : "Deactivated User Account Sucessfully"
          }`
        );
        refetchAllUsers();
      },
      onError: (err) => {
        message.error(`Failed: ${err}`);
      },
    });
  };

  const handleRoleChange = (userId: string, newRoleId: string) => {
    // Handle role change logic here (you can call an API to update the role)
    message.success(`Role updated to ${newRoleId}`);
  };

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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={18} className="text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the EditUserDialog */}
      {selectedUser && (
        <EditUserDialog
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          availableRoles={availableRoles}
          onRoleChange={handleRoleChange}
        />
      )}

      {/* Delete modal */}
      <DeleteModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={confirmDeleteUser}
      />
    </div>
  );
}
