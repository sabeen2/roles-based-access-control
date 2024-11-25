import { IApiDetails } from '@/schema/http.schema'
import { getFormData } from './get-form-data'

export const transformRequestData = (
    apiDetails: IApiDetails,
    requestData: any
) => {
    let transformedRequestData: any

    switch (apiDetails.requestBodyType) {
        case 'FORM-DATA':
            transformedRequestData = getFormData(requestData)
            break
        default:
            transformedRequestData = requestData
            break
    }

    return transformedRequestData
}
