import { RequestAuthType, RequestMethod } from "@/schema/http.schema";

const authorPrefix = "author";

const author = {
  getAuthors: {
    controllerName: `${authorPrefix}/get-authors`,
    queryKeyName: "GET_AUTHORS",
    requestMethod: RequestMethod.GET,
    requestAuthType: RequestAuthType.AUTH,
  },
  addAuthors: {
    controllerName: `${authorPrefix}/create-author`,
    queryKeyName: "ADD_AUTHOR",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  updateAuthor: {
    controllerName: `${authorPrefix}/update-author`,
    queryKeyName: "UPDATE_AUTHOR",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
  deleteAuthor: {
    controllerName: `${authorPrefix}/delete-author`,
    queryKeyName: "DELETE_AUTHOR",
    requestMethod: RequestMethod.POST,
    requestAuthType: RequestAuthType.AUTH,
  },
};

export default author;
