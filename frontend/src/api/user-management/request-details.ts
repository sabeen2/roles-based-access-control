import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const managePrefix = "manage";

const manage = {
  addNewRole: {
    controllerName: `${managePrefix}/add-new-role`,
    queryKeyName: "ADD_NEW_ROLE",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  deleteRole: {
    controllerName: `${managePrefix}/delete-role`,
    queryKeyName: "DELETE_ROLE",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  getAllRoles: {
    controllerName: `${managePrefix}/get-all-roles`,
    queryKeyName: "GET_ALL_ROLES",
    requestMethod: RequestMethod.GET,
    requestAuthType: RequestAuthType.AUTH,
  },
  editRole: {
    controllerName: `${managePrefix}/edit-role`,
    queryKeyName: "EDIT_ROLE",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  changeUserRole: {
    controllerName: `${managePrefix}/assign-role`,
    queryKeyName: "CHANGE_USER_ROLE",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  getAllUsers: {
    controllerName: `${managePrefix}/get-all-users`,
    queryKeyName: "GET_ALL_USERS",
    requestMethod: RequestMethod.GET,
    requestAuthType: RequestAuthType.AUTH,
  },
  deleteRestrictUser: {
    controllerName: `${managePrefix}/user-action`,
    queryKeyName: "DELETE_RESTRICT_USER",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default manage;
