"use client";

import React, { useState } from "react";
import UserProfileCard from "./AuthorProfileCard";
import { useGetAuthors } from "@/api/authors/queries";
import { IAuthorInterface } from "@/schema/authors.schema";
import { Button } from "@/components/ui/button";
import { PlusCircle, Moon, Sun } from "lucide-react";
import AuthorFormModal from "./AuthorFormModal";
import { userAgent } from "next/server";

const AuthorList = () => {
  const { data: authorData, refetch: refetchAuthorData } = useGetAuthors();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white ">Authors</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600"
          >
            <PlusCircle className="w-4 h-4" />
            Add Author
          </Button>
        </div>
      </div>
      <AuthorFormModal
        refetchAuthorData={refetchAuthorData}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {authorData?.data?.map((user: IAuthorInterface) => (
          <UserProfileCard
            refetchAuthorData={refetchAuthorData}
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
