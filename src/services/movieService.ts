import axios from "axios";
import type { Movie, MoviesResponse } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

const moviesInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await moviesInstance.get<MoviesResponse>("/movie", {
    params: {
      query,
    },
  });

  return data.results;
};
