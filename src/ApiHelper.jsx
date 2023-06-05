import axios from "axios";
import CryptoJS from 'crypto-js';

const HttpClient = async (uri, requestUrl, requestBody) => {
    const client = axios.create({
        baseURL: "/v3/",
        headers: {
            'Content-Type': 'application/json',
            'Api-Key': process.env.REACT_APP_API_KEY,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
    const timestamp = new Date().getTime();
    const contentHash = CryptoJS.SHA512(requestBody).toString(CryptoJS.enc.Hex);
    const preSign = [timestamp, uri, 'GET', contentHash, ''].join('');
    const apiSecret = process.env.REACT_APP_API_SECRET_KEY;
    const signature = CryptoJS.HmacSHA512(preSign, apiSecret).toString(CryptoJS.enc.Hex);
    const config = {
        headers: {
            'Api-Timestamp': timestamp,
            'Api-Content-Hash': contentHash,
            'Api-Signature': signature,
        }
    }
    return await client.get(requestUrl, config);
}

export default HttpClient;