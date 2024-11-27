import { slugify } from "./slugify.utils";

const paths = {
  homePath: () => {
    return "/";
  },

  getLoginPath: () => {
    return `/login`;
  },
  getSignupPath: () => {
    return `/signup`;
  },
  getAdminPanelPath: () => {
    return `/admin-panel`;
  },
  getAuthorPath: () => {
    return `/admin-panel/authors`;
  },
  getReviewPath: () => {
    return `/admin-panel/reviews`;
  },
  getBookingPath: () => {
    return `/admin-panel/bookings`;
  },
  getUserManagementPath: () => {
    return `/admin-panel/user-management`;
  },
};

export default paths;
