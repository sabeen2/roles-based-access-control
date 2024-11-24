import { Router } from "express";

import protectedRoute from "../middlewares/protectedRoute.middleware";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  updatedBooking,
} from "../controllers/booking/booking-crud.controller";

const bookingRouter = Router();
bookingRouter.use(protectedRoute);

// Setup route handler
bookingRouter.post("/create-booking", createBooking);
bookingRouter.get("/get-bookings", getAllBooking);
bookingRouter.put("/update-booking", updatedBooking);
bookingRouter.post("/delete-booking", deleteBooking);

export default bookingRouter;
