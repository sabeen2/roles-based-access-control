export const getBaseUrl = () => {
    if(typeof window !== 'undefined'){
        const url = window.location.href
        const urlObject = new URL(url)
        const baseUrl = `${urlObject.protocol}//${urlObject.host}`   
        return baseUrl
    }
}
