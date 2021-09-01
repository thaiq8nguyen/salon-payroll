import { responsiveFontSizes } from "@material-ui/core";
import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
        ? process.env.MIX_PRODUCTION_BASE_URL
        : process.env.MIX_DEV_BASE_URL;

export const client = axios.create({
    baseURL,
    header: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
});

export const authClient = axios.create({
    baseURL,
    header: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
});

authClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || null;
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
