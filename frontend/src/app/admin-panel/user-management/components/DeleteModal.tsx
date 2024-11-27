import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const DeleteModal = ({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  confirmDeleteUser,
}: any) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent className="bg-[#0f0f0f] border-gray-800/50">
        <DialogHeader>
          <DialogTitle className="text-gray-200">
            Are you sure you want to delete this user?
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            variant="ghost"
            onClick={() => setDeleteDialogOpen(false)}
            className="text-gray-400"
          >
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} className="text-red-400">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
