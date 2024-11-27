"use client";

import React, { useState } from "react";
import ReviewProfileCard from "./ReviewProfileCard";
import { useGetReviews } from "@/api/reviews/queries";
import { IReviewInterface } from "@/schema/reviews.schema";
import { Button } from "@/components/ui/button";
import { PlusCircle, Moon, Sun } from "lucide-react";
import ReviewFormModal from "./ReviewFormModal";
import { userAgent } from "next/server";

const ReviewList = () => {
  const { data: reviewData, refetch: refetchReviewData } = useGetReviews();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1450px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white ">Reviews</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600"
          >
            <PlusCircle className="w-4 h-4" />
            Add Review
          </Button>
        </div>
      </div>
      <ReviewFormModal
        refetchReviewData={refetchReviewData}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {reviewData?.data?.map((user: IReviewInterface) => (
          <ReviewProfileCard
            refetchReviewData={refetchReviewData}
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
