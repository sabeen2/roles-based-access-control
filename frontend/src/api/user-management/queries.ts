import { useMutation, useQuery } from "@tanstack/react-query";

import { apiList } from "..";
import { makeHttpRequest } from "@/utils/http/make-http-request";

const {
  addNewRole,
  deleteRole,
  getAllRoles,
  editRole,
  changeUserRole,
  getAllUsers,
  deleteRestrictUser,
} = apiList.manage;

export const useAddNewRole = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: (requestData: any) =>
      makeHttpRequest(addNewRole, {
        requestData,
      }),
  });
};

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: (requestData: { roleId: string }) =>
      makeHttpRequest(deleteRole, {
        requestData,
      }),
  });
};

export const useEditRole = () => {
  return useMutation({
    mutationFn: (requestData: {
      roleId: string;
      roleName: string;
      permissions: string[];
    }) =>
      makeHttpRequest(editRole, {
        requestData,
      }),
  });
};

export const useChangeUserRole = () => {
  return useMutation({
    mutationFn: (requestData: { userId: string; roleId: string }) =>
      makeHttpRequest(changeUserRole, {
        requestData,
      }),
  });
};

export const useDeleteRestrictUser = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: (requestData: any) =>
      makeHttpRequest(deleteRestrictUser, {
        requestData,
      }),
  });
};

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: [getAllRoles.queryKeyName],
    queryFn: () => makeHttpRequest(getAllRoles),
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [getAllUsers.queryKeyName],
    queryFn: () => makeHttpRequest(getAllUsers),
  });
};
