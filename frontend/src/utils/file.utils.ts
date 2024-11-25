export const excelFileExtensions = ['xlsx', 'xls', 'xml', 'xlsm', 'xlsb']

export const attachmentExtensions = `.jpg, .jpeg, .png, .pdf, .doc, .docx, ${excelFileExtensions.map(
    (extension) => `.${extension}, `
)}`

export const getImageUrl = (imagePath: string) => {
    const baseApiEndpoint =
        process.env.BASE_API_ENDPOINT ||
        process.env.NEXT_PUBLIC_BASE_API_ENDPOINT

    return `${baseApiEndpoint}/image/?path=${imagePath}`
}
