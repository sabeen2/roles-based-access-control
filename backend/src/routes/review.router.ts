import { Router } from "express";

import protectedRoute from "../middlewares/protectedRoute.middleware";

import {
  createReview,
  deleteReview,
  getAllReview,
  updatedReview,
} from "../controllers/review/review-crud.controller";

const reviewRouter = Router();
reviewRouter.use(protectedRoute);

// Setup route handler
reviewRouter.post("/create-review", createReview);
reviewRouter.get("/get-reviews", getAllReview);
reviewRouter.put("/update-review", updatedReview);
reviewRouter.post("/delete-review", deleteReview);

export default reviewRouter;
