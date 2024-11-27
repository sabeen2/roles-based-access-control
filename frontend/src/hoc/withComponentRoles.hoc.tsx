"use client";
import { useGetUserRole } from "@/api/userAuth/queries";
import { Result, Spin, Empty } from "antd";

export const withComponentRoles = (
  WrappedComponent: React.ComponentType<any>,
  componentName: any
) => {
  const ComponentWithRole = (props: any) => {
    const { data: userRolesData, isLoading: loadingUserRoles } =
      useGetUserRole();

    const hasRole = (userRolesData?.data?.role?.permissions || []).find(
      (item: any) => item?.sideBarItem === componentName
    )?.canRead;

    const centeredStyle = {
      height: "calc(100svh - 64px)",
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <>
        {loadingUserRoles ? (
          <Spin>
            <div style={centeredStyle}>
              <Empty />
            </div>
          </Spin>
        ) : hasRole ? (
          <WrappedComponent {...props} />
        ) : (
          <Result
            style={{
              ...centeredStyle,
              display: "grid",
              placeContent: "center",
            }}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        )}
      </>
    );
  };

  return ComponentWithRole;
};
