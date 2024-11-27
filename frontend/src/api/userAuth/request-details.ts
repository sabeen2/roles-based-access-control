import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

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
  getUserRole: {
    controllerName: `get-user-roles`,
    queryKeyName: "GET_USER_ROLE",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  userLogout: {
    controllerName: `${authPrefix}/logout`,
    queryKeyName: "USER_LOGOUT",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default userAuth;
