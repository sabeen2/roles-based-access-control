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

const EditUserDialog = ({
  selectedUser,
  setSelectedUser,
  handleDeleteUser,
  user,
  setSelectedRole,
  selectedRole,
  uniqueRoles,
}: any) => {
  const handleSaveChanges = () => {
    if (selectedUser && selectedRole) {
      console.log("User ID:", selectedUser.id);
      console.log("Selected Role ID:", selectedRole);
    }
    setSelectedUser(null);
  };

  return (
    <Dialog
      open={!!selectedUser}
      onOpenChange={(open) => !open && setSelectedUser(null)}
    >
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
          <DialogTitle className="text-gray-200">Change User Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-gray-400">User:</span>
            <span className="col-span-3 text-gray-200">
              {selectedUser?.fullName}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-gray-400">Role:</span>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-gray-800 text-gray-300">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {uniqueRoles.map((role: { name: string; id: string }) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setSelectedUser(null)}
            className="text-gray-400 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
