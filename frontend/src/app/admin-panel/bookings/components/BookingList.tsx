"use client";

import React, { useState } from "react";
import BookingProfileCard from "./BookingProfileCard";
import { useGetBookings } from "@/api/bookings/queries";
import { IBookingInterface } from "@/schema/bookings.schema";
import { Button } from "@/components/ui/button";
import { PlusCircle, Moon, Sun } from "lucide-react";
import BookingFormModal from "./BookingFormModal";
import { userAgent } from "next/server";

const BookingList = () => {
  const { data: bookingData, refetch: refetchBookingData } = useGetBookings();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white ">Bookings</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600"
          >
            <PlusCircle className="w-4 h-4" />
            Add Booking
          </Button>
        </div>
      </div>
      <BookingFormModal
        refetchBookingData={refetchBookingData}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {bookingData?.data?.map((user: IBookingInterface) => (
          <BookingProfileCard
            refetchBookingData={refetchBookingData}
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
