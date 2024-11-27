"use client";
import { withComponentRoles } from "@/hoc/withComponentRoles.hoc";
import React from "react";

const UserManagementPage = () => {
  return <div className="text-white">UserManagementPage</div>;
};

export default withComponentRoles(UserManagementPage, "ManageUsers");
