import { useMutation, useQuery } from "@tanstack/react-query";

import { apiList } from "..";
import { makeHttpRequest } from "@/utils/http/make-http-request";
import { IAuthorRequest } from "@/schema/authors.schema";

const { getAuthors, addAuthors, updateAuthor } = apiList.author;

export const useGetAuthors = () => {
  return useQuery({
    queryKey: [getAuthors.queryKeyName],
    queryFn: () => makeHttpRequest(getAuthors),
  });
};

export const useAddAuthor = () => {
  return useMutation({
    mutationFn: (requestData: IAuthorRequest) =>
      makeHttpRequest(addAuthors, {
        requestData,
      }),
  });
};

export const useUpdateAuthor = () => {
  return useMutation({
    mutationFn: (requestData: IAuthorRequest) =>
      makeHttpRequest(updateAuthor, {
        requestData,
      }),
  });
};

export const useDeleteAuthor = () => {
  return useMutation({
    mutationFn: (requestData: { authorId: string }) =>
      makeHttpRequest(updateAuthor, {
        requestData,
      }),
  });
};
