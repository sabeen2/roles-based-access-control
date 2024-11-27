// // EditUserDialog.tsx
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// type EditUserDialogProps = {
//   isOpen: boolean;
//   selectedUser: { fullName: string; email: string } | null;
//   availableRoles: { id: string; name: string }[];
//   selectedRole: string;
//   setSelectedRole: (role: string) => void;
//   onClose: () => void;
//   onSave: () => void;
// };

// const EditUserDialog: React.FC<EditUserDialogProps> = ({
//   isOpen,
//   selectedUser,
//   availableRoles,
//   selectedRole,
//   setSelectedRole,
//   onClose,
//   onSave,
// }) => {
//   return (
//     <DialogContent className="bg-[#0f0f0f] border-gray-800/50" open={isOpen}>
//       <DialogHeader>
//         <DialogTitle className="text-gray-200">Change User Role</DialogTitle>
//       </DialogHeader>
//       <div className="space-y-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <span className="text-right text-gray-400">User:</span>
//           <span className="col-span-3 text-gray-200">
//             {selectedUser?.fullName}
//           </span>
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <span className="text-right text-gray-400">Role:</span>
//           <Select value={selectedRole} onValueChange={setSelectedRole}>
//             <SelectTrigger className="w-full">
//               <SelectValue
//                 placeholder="Select role"
//                 className="text-gray-300"
//               />
//             </SelectTrigger>
//             <SelectContent>
//               {availableRoles.map((role) => (
//                 <SelectItem key={role.id} value={role.id}>
//                   {role.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <div className="mt-4 flex justify-end space-x-4">
//         <Button variant="ghost" onClick={onClose} className="text-gray-400">
//           Cancel
//         </Button>
//         <Button onClick={onSave} className="text-gray-200">
//           Save
//         </Button>
//       </div>
//     </DialogContent>
//   );
// };

// export default EditUserDialog;
