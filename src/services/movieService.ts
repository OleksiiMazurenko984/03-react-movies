import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

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
