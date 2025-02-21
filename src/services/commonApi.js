import axios from 'axios';

export const commonApi = async (httpRequest, url, reqBody, reqHeader) => {
    console.log("API Request:", httpRequest, url);
    console.log("Request Headers:", reqHeader);
    const reqConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }

    return await axios(reqConfig).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
}




