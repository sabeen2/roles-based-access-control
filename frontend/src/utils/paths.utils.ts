import { slugify } from "./slugify.utils";

const paths = {
  homePath: () => {
    return "/";
  },

  companiesPath: () => {
    return `/companies`;
  },

  salariesPath: () => {
    return `/salaries`;
  },
  getLoginPath: () => {
    return `/login`;
  },
  getSignupPath: () => {
    return `/signup`;
  },

  getOverviewByCompanyNamePath: (companyName: string, id: number) => {
    return `/companies/${slugify(companyName)}/${id}?tab=overview`;
  },
  getReviewByCompanyNamePath: (companyName: string, id: number) => {
    return `/companies/${slugify(companyName)}/${id}?tab=reviews`;
  },
  getSalariesByCompanyNamePath: (companyName: string, id: number) => {
    return `/companies/${slugify(companyName)}/${id}?tab=salaries`;
  },
  getCreateReviewsPath: () => {
    return `/create`;
  },
  getProfilePath: () => {
    return `/member/profile`;
  },
  getContributionsPath: () => {
    return `/member/contributions`;
  },
};

export default paths;
