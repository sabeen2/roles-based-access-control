"use client";

import React, { useState } from "react";
import BookingProfileCard from "./BookingProfileCard";
import { useGetBookings } from "@/api/bookings/queries";
import { IBookingInterface } from "@/schema/bookings.schema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import BookingFormModal from "./BookingFormModal";
import { withComponentRoles } from "../../../../hoc/withComponentRoles";

const BookingList = () => {
  const {
    data: bookingData,
    refetch: refetchBookingData,
    isLoading,
  } = useGetBookings();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bookings based on search query
  const filteredBookings = bookingData?.data?.filter(
    (booking: IBookingInterface) => {
      const bookingName = booking?.name?.toLowerCase() || "";
      const customerName = booking?.description?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return bookingName.includes(query) || customerName.includes(query);
    }
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bookings</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
            placeholder="Search bookings..."
            className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-40 w-full bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredBookings?.length > 0 ? (
            filteredBookings.map((booking: IBookingInterface) => (
              <BookingProfileCard
                refetchBookingData={refetchBookingData}
                key={booking.id}
                user={booking}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No bookings found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default withComponentRoles(BookingList, "Bookings");
