import axios from "axios";

const TmdbApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
    params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: "pt-BR" },
});

export default TmdbApi;
