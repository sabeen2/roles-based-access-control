"use client";
import { useGetAllUsers } from "@/api/user-management/queries";
import { withComponentRoles } from "@/hoc/withComponentRoles.hoc";
import ManagementTable from "./components/ManagementTable";

const UserManagementPage = () => {
  const { data: allUsersData } = useGetAllUsers();
  console.log(allUsersData?.users);
  return <ManagementTable />;
};

export default withComponentRoles(UserManagementPage, "ManageUsers");
