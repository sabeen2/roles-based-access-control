"use client";
import { useGetAuthors } from "@/api/authors/queries";
import ReusableTable from "@/components/ReusableTable";
import React, { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "3", name: "Sam Wilson", email: "sam@example.com", role: "Moderator" },
  { id: "4", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "5", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "6", name: "Sam Wilson", email: "sam@example.com", role: "Moderator" },
  { id: "7", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "8", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "9", name: "Sam Wilson", email: "sam@example.com", role: "Moderator" },
  { id: "10", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "11", name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: "12", name: "Sam Wilson", email: "sam@example.com", role: "Moderator" },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "About",
    dataIndex: "about",
    key: "about",
  },
];

const AuthorTable = () => {
  const { data: authorData = [], isLoading: loadingAuthorData } =
    useGetAuthors();

  const handleRowClick = (record: User) => {
    console.log("Row clicked:", record);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log("Table params:", pagination, filters, sorter);
  };

  return (
    <div className="space-y-4 ">
      <h1 className="font-semibold text-xl">User Management</h1>
      <ReusableTable<User>
        className="items-center"
        data={authorData?.data}
        size="small"
        columns={columns}
        loading={loadingAuthorData}
        rowKey="id"
        pagination={{
          showPrevNextJumpers: true,
        }}
        onRowClick={handleRowClick}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default AuthorTable;
