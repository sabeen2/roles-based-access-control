import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useGetUserRole } from "@/api/userAuth/queries";

interface UserRolesContextType {
  userRolesData: any;
  loadingUserRoles: boolean;
}

const UserRolesContext = createContext<UserRolesContextType | undefined>(
  undefined
);

export const useUserRoles = () => {
  const context = useContext(UserRolesContext);
  if (!context) {
    throw new Error("useUserRoles must be used within a UserRolesProvider");
  }
  return context;
};

const UserRolesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: userRolesData, isLoading: loadingUserRoles } = useGetUserRole();

  const value = {
    userRolesData: userRolesData?.data,
    loadingUserRoles,
  };

  return (
    <UserRolesContext.Provider value={value}>
      {children}
    </UserRolesContext.Provider>
  );
};

export default UserRolesProvider;
