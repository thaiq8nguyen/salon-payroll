import axios from "axios";

const baseUrl = process.env.production ? process.env.productionBaseUrl : process.env.devBaseUrl;

export const client =  axio.create({
    baseUrl,
    header: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
})

export const authClient = axios.create({
    baseUrl,
    header: {
        "Content-type": "application/json"
    }
})

