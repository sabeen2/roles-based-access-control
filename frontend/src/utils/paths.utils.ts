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
};

export default paths;
