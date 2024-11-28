"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protectedRoute_middleware_1 = __importDefault(require("../middlewares/protectedRoute.middleware"));
const author_crud_controller_1 = require("../controllers/author/author-crud.controller");
const authorRouter = (0, express_1.Router)();
authorRouter.use(protectedRoute_middleware_1.default);
// Setup route handler
authorRouter.post("/create-author", author_crud_controller_1.createAuthor);
authorRouter.get("/get-authors", author_crud_controller_1.getAllAuthor);
authorRouter.put("/update-author", author_crud_controller_1.updatedAuthor);
authorRouter.post("/delete-author", author_crud_controller_1.deleteAuthor);
exports.default = authorRouter;
