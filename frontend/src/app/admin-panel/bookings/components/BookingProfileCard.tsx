import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Pencil,
  Trash2,
  MoreVertical,
  CheckCircle,
} from "lucide-react";
import { useDeleteBooking } from "@/api/bookings/queries";
import { message } from "antd";
import BookingFormModal from "./BookingFormModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BookingProfileCard = ({
  user,
  refetchBookingData,
}: {
  user: any;
  refetchBookingData?: any;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteBooking } = useDeleteBooking();

  const handleDelete = (id: string) => {
    let payload = {
      id,
    };
    deleteBooking(payload, {
      onSuccess: () => {
        message.success("Deleted Booking Successfully");
        refetchBookingData();
        setIsDeleteModalOpen(false);
      },
      onError: (err) => {
        message.error(`Failed: ${err}`);
      },
    });
  };

  const onEdit = (selectedUser: any) => {
    setSelectedUser(selectedUser);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 max-w-sm">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage
                  src={user.profileImage || "/images/user.png"}
                  alt={`${user.name}'s profile`}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-100 tracking-tight truncate max-w-[70%]">
                  {user.name}
                </h2>
                {user.verified && (
                  <span className="flex items-center text-xs font-medium text-primary">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 min-h-[2.5rem]">
                {user.description || "No description available"}
              </p>
            </div>
          </CardContent>
        </Card>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 absolute top-2 right-2 bg-gray-800/60 hover:bg-gray-700/80"
            >
              <MoreVertical className="h-4 w-4 text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 bg-gray-800 border-gray-700"
          >
            <DropdownMenuItem
              onClick={() => onEdit(user)}
              className="text-gray-200 focus:text-white focus:bg-gray-700"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-400 focus:text-red-300 focus:bg-red-900/50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-gray-900 text-gray-100 border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this user profile? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(user.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isModalOpen && (
        <BookingFormModal
          refetchBookingData={refetchBookingData}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default BookingProfileCard;
