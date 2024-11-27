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
import { useAddBooking, useUpdateBooking } from "@/api/bookings/queries";
import { message } from "antd";

interface AddBookingModalProps {
  refetchBookingData: () => void;
  isOpen: boolean;
  onClose: () => void;
  user?: any; // Add user prop to pass selected user data
}

const BookingFormModal: React.FC<AddBookingModalProps> = ({
  refetchBookingData,
  isOpen,
  onClose,
  user,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addNewBooking, isPending: isAddingBooking } = useAddBooking();
  const { mutate: updateBooking, isPending: isUpdatingBooking } =
    useUpdateBooking();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        description: user.description,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: any) => {
    if (user) {
      let payload = {
        id: user.id,
        name: data.name,
        description: data.description,
      };
      updateBooking(payload, {
        onSuccess: () => {
          message.success(` Updated Booking Sucessfully`);
          refetchBookingData();

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
        description: data.description,
      };
      addNewBooking(payload, {
        onSuccess: () => {
          message.success(`Added New Booking Sucessfully`);
          refetchBookingData();
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
              placeholder="Enter booking's name"
              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Enter booking's bio"
              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button
            disabled={isAddingBooking || isUpdatingBooking}
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

export default BookingFormModal;
