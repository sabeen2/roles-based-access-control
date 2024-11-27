import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddAuthor, useUpdateAuthor } from "@/api/authors/queries";
import { message } from "antd";

interface AddAuthorModalProps {
  refetchAuthorData: () => void;
  isOpen: boolean;
  onClose: () => void;
  user?: any; // Add user prop to pass selected user data
}

const AuthorFormModal: React.FC<AddAuthorModalProps> = ({
  refetchAuthorData,
  isOpen,
  onClose,
  user,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addNewAuthor, isPending: isAddingAuthor } = useAddAuthor();
  const { mutate: updateAuthor, isPending: isUpdatingAuthor } =
    useUpdateAuthor();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        about: user.about,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: any) => {
    if (user) {
      let payload = {
        id: user.id,
        name: data.name,
        about: data.about,
      };
      updateAuthor(payload, {
        onSuccess: () => {
          message.success(` Updated Author Sucessfully`);
          refetchAuthorData();

          reset();
          onClose();
        },
        onError: (err) => {
          message.error(`Failed: ${err}`);
        },
      });
    } else {
      let payload = {
        name: data.name,
        about: data.about,
      };
      addNewAuthor(payload, {
        onSuccess: () => {
          message.success(`Added New Author Sucessfully`);
          refetchAuthorData();
          reset();
          onClose();
        },
        onError: (err) => {
          message.error(`Failed: ${err}`);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {user ? "Edit Author " : "Add Author"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter author's name"
              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="about"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              About
            </label>
            <Textarea
              id="about"
              {...register("about", { required: true })}
              placeholder="Enter author's bio"
              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button
            disabled={isAddingAuthor || isUpdatingAuthor}
            type="submit"
            className="w-full bg-blue-700 text-white hover:bg-blue-600 border-gray-600 border"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorFormModal;
