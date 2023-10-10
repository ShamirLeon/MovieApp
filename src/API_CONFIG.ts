import axios, { AxiosRequestConfig } from "axios"

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    cache?: string;
}

const Axios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_TMDB_API}`,
    }
})

export { Axios, type CustomAxiosRequestConfig }