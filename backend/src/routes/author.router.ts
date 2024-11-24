import { Router } from "express";

import protectedRoute from "../middlewares/protectedRoute.middleware";

import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  updatedAuthor,
} from "../controllers/booking/author-crud.controller";

const authorRouter = Router();
authorRouter.use(protectedRoute);

// Setup route handler
authorRouter.post("/create-author", createAuthor);
authorRouter.get("/get-authors", getAllAuthor);
authorRouter.put("/update-author", updatedAuthor);
authorRouter.post("/delete-author", deleteAuthor);

export default authorRouter;
