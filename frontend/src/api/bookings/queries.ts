import { useMutation, useQuery } from "@tanstack/react-query";

import { apiList } from "..";
import { makeHttpRequest } from "@/utils/http/make-http-request";
import { IBookingRequest } from "@/schema/bookings.schema";

const { getBookings, addBookings, updateBooking } = apiList.booking;

export const useGetBookings = () => {
  return useQuery({
    queryKey: [getBookings.queryKeyName],
    queryFn: () => makeHttpRequest(getBookings),
  });
};

export const useAddBooking = () => {
  return useMutation({
    mutationFn: (requestData: IBookingRequest) =>
      makeHttpRequest(addBookings, {
        requestData,
      }),
  });
};

export const useUpdateBooking = () => {
  return useMutation({
    mutationFn: (requestData: IBookingRequest) =>
      makeHttpRequest(updateBooking, {
        requestData,
      }),
  });
};

export const useDeleteBooking = () => {
  return useMutation({
    mutationFn: (requestData: { bookingId: string }) =>
      makeHttpRequest(updateBooking, {
        requestData,
      }),
  });
};
