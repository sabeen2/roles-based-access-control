import { useMutation, useQuery } from "@tanstack/react-query";

import { apiList } from "..";
import { makeHttpRequest } from "@/utils/http/make-http-request";
import { IReviewRequest } from "@/schema/reviews.schema";

const { getReviews, addReviews, updateReview, deleteReview } = apiList.review;

export const useGetReviews = () => {
  return useQuery({
    queryKey: [getReviews.queryKeyName],
    queryFn: () => makeHttpRequest(getReviews),
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationFn: (requestData: IReviewRequest) =>
      makeHttpRequest(addReviews, {
        requestData,
      }),
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: (requestData: IReviewRequest) =>
      makeHttpRequest(updateReview, {
        requestData,
      }),
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (requestData: { id: string }) =>
      makeHttpRequest(deleteReview, {
        requestData,
      }),
  });
};
