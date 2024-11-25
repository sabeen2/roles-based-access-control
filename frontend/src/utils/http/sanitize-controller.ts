import { IApiDetails, PrimitiveType } from '@/schema/http.schema'

export const sanitizeController = (
    apiDetails: IApiDetails,
    pathVariables?: { [key: string]: PrimitiveType }
) => {
    return pathVariables && Object.keys(pathVariables).length
        ? {
              ...apiDetails,
              controllerName: Object.entries(pathVariables).reduce(
                  // eslint-disable-next-line no-return-assign, no-param-reassign
                  (acc, [key, value]) =>
                      // eslint-disable-next-line no-return-assign, no-param-reassign
                      (acc = acc.replace(`{${key}}`, value?.toString())),
                  apiDetails.controllerName
              ),
          }
        : apiDetails
}
