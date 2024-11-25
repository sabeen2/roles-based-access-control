export interface IReview {
  id: number;
  title: string;
  rating: number;
  jobTitle: string;
  status: string;
  date: string; // You might want to use `Date` type if parsing it as a Date object
  content: string;
  helpful: number;
  notHelpful: number;
  comments: number;
}

export interface IReviewHeaderProps {
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  jobTitleFilter: string;
  setJobTitleFilter: (jobTitle: string) => void;
  isScrolled: boolean;
  reviews: IReview[];
}

export interface IReviewCardProps {
  ratingFilter: number;
  jobTitleFilter: string;
  reviews: IReview[];
}
