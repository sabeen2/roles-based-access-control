"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, ShieldCheck } from "lucide-react";
import ManageUsersTable from "./ManageUsersTable";
import ManageRolesTable from "./ManageRolesTable";

export default function ManagementTable() {
  return (
    <div className="text-gray-100 overflow-hidden">
      <div className="max-w-[1450px] mx-auto rounded-2xl border border-gray-800/50 shadow-2xl">
        <div className="p-6 border-b border-gray-800/30">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text text-white">
            User Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and configure user roles and permissions
          </p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-[#0a0a0a] border-b border-gray-800/30 px-6 space-x-2">
            <TabsTrigger
              value="users"
              className="
                data-[state=active]:bg-blue-900/40 
                data-[state=active]:text-blue-300 
                text-gray-500 
                rounded-lg 
                transition-all 
                duration-300 
                hover:bg-gray-800/50
              "
            >
              <UserCircle2 className="mr-2 h-5 w-5" />
              Manage Users
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="
                data-[state=active]:bg-blue-900/40 
                data-[state=active]:text-blue-300 
                text-gray-500 
                rounded-lg 
                transition-all 
                duration-300 
                hover:bg-gray-800/50
              "
            >
              <ShieldCheck className="mr-2 h-5 w-5" />
              Manage Roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="p-6">
            <ManageUsersTable />
          </TabsContent>

          {/* <TabsContent value="roles" className="p-6">
            <ManageRolesTable />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
