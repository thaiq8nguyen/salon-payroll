import axios from "axios";

const baseUrl =
    process.env.NODE_ENV === "production"
        ? process.env.MIX_PRODUCTION_BASE_URL
        : process.env.MIX_DEV_BASE_URL;

export const client = axios.create({
    baseUrl,
    header: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
});

export const authClient = axios.create({
    baseUrl,
    header: {
        "Content-type": "application/json",
    },
});
