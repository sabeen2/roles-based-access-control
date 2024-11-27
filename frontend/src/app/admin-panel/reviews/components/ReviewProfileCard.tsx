import { CalendarDays, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReviewFormModal from "./ReviewFormModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteReview } from "@/api/reviews/queries";
import { message } from "antd";

const ReviewProfileCard = ({
  user,
  refetchReviewData,
}: {
  user: any;
  refetchReviewData?: any;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteReview } = useDeleteReview();

  const handleDelete = (id: string) => {
    let payload = {
      id,
    };
    deleteReview(payload, {
      onSuccess: () => {
        message.success(` Deleted Review Sucessfully`);
        refetchReviewData();
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
      <Card className="group relative overflow-hidden bg-gray-900 border-neutral-800 transition-all duration-300 hover:shadow-xl">
        <CardHeader className="relative p-0 h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-[1]"></div>
          <Image
            height={900}
            width={900}
            src={user.profileImage || "/images/user.png"}
            alt={`${user.name}'s profile`}
            className="absolute h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-90"
          />
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <Button
              onClick={() => onEdit(user)}
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 transition-all duration-300 hover:scale-110"
              title="Edit Profile"
            >
              <Pencil className="h-5 w-5 text-neutral-300 hover:text-white" />
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              size="icon"
              variant="destructive"
              className="h-10 w-10 rounded-full bg-red-900/80 hover:bg-red-800 border border-red-700 transition-all duration-300 hover:scale-110"
              title="Delete Profile"
            >
              <Trash2 className="h-5 w-5 text-red-300 hover:text-white" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-3 relative z-[2]">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-neutral-100 tracking-tight max-w-[70%] truncate">
              {user.name}
            </h2>
            {user.verified && (
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                Verified
              </span>
            )}
          </div>
          <p className="text-neutral-400 text-sm line-clamp-2 min-h-[2.5rem]">
            {user.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter className="flex items-center space-x-2 text-neutral-500 pt-3 border-t border-neutral-800">
          <CalendarDays className="w-4 h-4" />
          <span className="text-xs">
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-neutral-900 text-neutral-100">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Are you sure you want to delete this user profile? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(user.id) as any}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isModalOpen && (
        <ReviewFormModal
          refetchReviewData={refetchReviewData}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default ReviewProfileCard;
