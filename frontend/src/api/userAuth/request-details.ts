import { RequestMethod } from "@/schema/http.schema";

const userPrefix = "user";
const authPrefix = "auth";

const userAuth = {
  userLogin: {
    controllerName: `${authPrefix}/login`,
    queryKeyName: "USER_LOGIN",
    requestMethod: RequestMethod.POST,
  },
  userSignup: {
    controllerName: `${authPrefix}/signup`,
    queryKeyName: "USER_SIGNUP",
    requestMethod: RequestMethod.POST,
  },
};

export default userAuth;
