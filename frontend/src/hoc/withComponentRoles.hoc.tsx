"use client";

import { useGetUserRole } from "@/api/userAuth/queries";
import { Skeleton, Result } from "antd";
import React from "react";

export const withComponentRoles = (
  WrappedComponent: React.ComponentType<any>,
  componentName: string
) => {
  const ComponentWithRole = (props: any) => {
    const { data: userRolesData, isLoading: loadingUserRoles } =
      useGetUserRole();

    const hasRole = (userRolesData?.data?.role?.permissions || []).some(
      (item: any) => item?.sideBarItem === componentName && item?.canRead
    );

    const centeredStyle = {
      height: "calc(100svh - 150px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <>
        {loadingUserRoles ? (
          <div style={centeredStyle}>
            <Skeleton active />
          </div>
        ) : hasRole ? (
          <WrappedComponent {...props} />
        ) : (
          <Result
            style={{
              ...centeredStyle,
              display: "grid",
              placeContent: "center",
              color: "white",
            }}
            status="403"
            title={
              <span
                className="text-[8rem] font-semibold"
                style={{ color: "white" }}
              >
                Access Denied
              </span>
            }
            subTitle={
              <span className=" text-md md:text-xl" style={{ color: "white" }}>
                Sorry, you don't have permission to access "{componentName}".
              </span>
            }
          />
        )}
      </>
    );
  };

  return ComponentWithRole;
};
