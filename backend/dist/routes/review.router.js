"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRoute_middleware_1 = __importDefault(require("../middlewares/protectedRoute.middleware"));
const review_crud_controller_1 = require("../controllers/review/review-crud.controller");
const reviewRouter = (0, express_1.Router)();
reviewRouter.use(protectedRoute_middleware_1.default);
// Setup route handler
reviewRouter.post("/create-review", review_crud_controller_1.createReview);
reviewRouter.get("/get-reviews", review_crud_controller_1.getAllReview);
reviewRouter.put("/update-review", review_crud_controller_1.updatedReview);
reviewRouter.post("/delete-review", review_crud_controller_1.deleteReview);
exports.default = reviewRouter;
