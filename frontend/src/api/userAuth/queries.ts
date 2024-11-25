import { useMutation } from "@tanstack/react-query";

import { apiList } from "..";
import { makeHttpRequest } from "@/utils/http/make-http-request";
import { ILoginRequest, ISignupRequest } from "@/schema/userAuth.schema";

const { userLogin, userSignup } = apiList.userAuth;

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (requestData: ILoginRequest) =>
      makeHttpRequest(userLogin, {
        requestData,
      }),
  });
};

export const useUserSignup = () => {
  return useMutation({
    mutationFn: (requestData: ISignupRequest) =>
      makeHttpRequest(userSignup, {
        requestData,
      }),
  });
};
