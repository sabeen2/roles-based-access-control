import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const bookingPrefix = "booking";

const booking = {
  getBookings: {
    controllerName: `${bookingPrefix}/get-bookings`,
    queryKeyName: "GET_BOOKING",
    requestMethod: RequestMethod.GET,
    requestAuthType: RequestAuthType.AUTH,
  },
  addBookings: {
    controllerName: `${bookingPrefix}/create-booking`,
    queryKeyName: "ADD_BOOKING",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  updateBooking: {
    controllerName: `${bookingPrefix}/update-booking`,
    queryKeyName: "UPDATE_BOOKING",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  deleteBooking: {
    controllerName: `${bookingPrefix}/delete-booking`,
    queryKeyName: "DELETE_BOOKING",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default booking;
