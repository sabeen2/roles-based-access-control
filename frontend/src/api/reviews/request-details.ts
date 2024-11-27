import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const reviewPrefix = "review";

const review = {
  getReviews: {
    controllerName: `${reviewPrefix}/get-reviews`,
    queryKeyName: "GET_REVIEWS",
    requestMethod: RequestMethod.GET,
    requestAuthType: RequestAuthType.AUTH,
  },
  addReviews: {
    controllerName: `${reviewPrefix}/create-review`,
    queryKeyName: "ADD_REVIEW",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  updateReview: {
    controllerName: `${reviewPrefix}/update-review`,
    queryKeyName: "UPDATE_REVIEW",
    requestMethod: RequestMethod.PUT,
    requestAuthType: RequestAuthType.AUTH,
  },
  deleteReview: {
    controllerName: `${reviewPrefix}/delete-review`,
    queryKeyName: "DELETE_REVIEW",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default review;
