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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, ArrowUpRight, Edit, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  useDeleteRestrictUser,
  useGetAllUsers,
} from "@/api/user-management/queries";
import { message } from "antd";
import DeleteModal from "./DeleteModal";

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
  const [selectedRole, setSelectedRole] = useState<string>("");
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
                        <DropdownMenuItem
                          onSelect={() => handleDeleteUser(user.id)}
                          className="cursor-pointer hover:bg-gray-800"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={() => setSelectedUser(user)}
                            className="cursor-pointer hover:bg-gray-800"
                          >
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit User Dialog */}
                    <DialogContent className="bg-[#0f0f0f] border-gray-800/50">
                      <DialogHeader>
                        <DialogTitle className="text-gray-200">
                          Change User Role
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-right text-gray-400">
                            User:
                          </span>
                          <span className="col-span-3 text-gray-200">
                            {selectedUser?.fullName}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="text-right text-gray-400">
                            Role:
                          </span>
                          <Select
                            value={selectedRole}
                            onValueChange={setSelectedRole}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder="Select role"
                                className="text-gray-300"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {availableRoles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-4">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setSelectedUser(null);
                            setSelectedRole("");
                          }}
                          className="text-gray-400"
                        >
                          Cancel
                        </Button>
                        <Button
                          //   onClick={handleRoleChange}
                          className="text-gray-200"
                        >
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        confirmDeleteUser={confirmDeleteUser}
      />
    </div>
  );
}
