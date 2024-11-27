import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const ChangeRole = ({
  selectedUser,
  setSelectedRole,
  availableRoles,
  handleRoleChange,
  selectedRole,
}: any) => {
  return (
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
          <span className="text-right text-gray-400">Current Role:</span>
          <span className="col-span-3 text-gray-200">
            {selectedUser?.role.name}
          </span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <span className="text-right text-gray-400">New Role:</span>
          <Select onValueChange={(value) => setSelectedRole(value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map((role: any) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleRoleChange}
          className="bg-blue-600 hover:bg-blue-500"
          disabled={!selectedRole}
        >
          Save Changes
        </Button>
      </div>
    </DialogContent>
  );
};

export default ChangeRole;
