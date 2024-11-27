"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { useDeleteAuthor } from "@/api/authors/queries";
import { message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
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
import AuthorFormModal from "./AuthorFormModal";

const AuthorProfileCard = ({
  user,
  refetchAuthorData,
}: {
  user: any;
  refetchAuthorData?: any;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteAuthor } = useDeleteAuthor();

  const handleDelete = (id: string) => {
    let payload = {
      id,
    };
    deleteAuthor(payload, {
      onSuccess: () => {
        message.success(` Deleted Author Successfully`);
        refetchAuthorData();
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-neutral-700 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <Image
                  height={80}
                  width={80}
                  src={user.profileImage || "/images/user.png"}
                  alt={`${user.name}'s profile`}
                  className="rounded-full border-4 border-neutral-700 shadow-lg"
                />
                {user.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                    className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onEdit(user)}
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-600 transition-all duration-300 hover:scale-110"
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
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {user.name}
              </h2>
              <p className="text-neutral-400 text-sm line-clamp-3 min-h-[4.5rem]">
                {user.about || "No description available"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-black/20 backdrop-blur-sm flex items-center space-x-2 text-neutral-400 py-3 px-6">
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
      </motion.div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent className="bg-neutral-900 text-neutral-100 border border-neutral-700">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription className="text-neutral-400">
                    Are you sure you want to delete this user profile? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(user.id) as any}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {isModalOpen && (
        <AuthorFormModal
          refetchAuthorData={refetchAuthorData}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default AuthorProfileCard;
