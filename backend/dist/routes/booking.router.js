"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRoute_middleware_1 = __importDefault(require("../middlewares/protectedRoute.middleware"));
const booking_crud_controller_1 = require("../controllers/booking/booking-crud.controller");
const bookingRouter = (0, express_1.Router)();
bookingRouter.use(protectedRoute_middleware_1.default);
// Setup route handler
bookingRouter.post("/create-booking", booking_crud_controller_1.createBooking);
bookingRouter.get("/get-bookings", booking_crud_controller_1.getAllBooking);
bookingRouter.put("/update-booking", booking_crud_controller_1.updatedBooking);
bookingRouter.post("/delete-booking", booking_crud_controller_1.deleteBooking);
exports.default = bookingRouter;
