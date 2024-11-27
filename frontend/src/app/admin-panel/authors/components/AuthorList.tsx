"use client";

import React, { useEffect, useState } from "react";
import { useGetAuthors } from "@/api/authors/queries";
import { IAuthorInterface } from "@/schema/authors.schema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AuthorFormModal from "./AuthorFormModal";
import AuthorProfileCard from "./AuthorProfileCard";
import { withComponentRoles } from "../../../../hoc/withComponentRoles";

const AuthorList = () => {
  const {
    data: authorData,
    refetch: refetchAuthorData,
    isLoading,
  } = useGetAuthors();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter authors based on search query
  const filteredAuthors = authorData?.data?.filter((author: IAuthorInterface) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Authors</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
            placeholder="Search authors..."
            className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-40 w-full bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredAuthors?.length > 0 ? (
            filteredAuthors.map((user: IAuthorInterface) => (
              <AuthorProfileCard
                refetchAuthorData={refetchAuthorData}
                key={user.id}
                user={user}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No authors found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default withComponentRoles(AuthorList, "Authors");
