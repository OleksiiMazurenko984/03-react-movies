import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const onSubmit = async (query: string): Promise<void> => {
    try {
      setLoader(true);
      setError(false);
      setMovies([]);
      const movies = await fetchMovies(query);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(movies);
    } catch {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onClose = () => setSelectedMovie(null);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {isLoader && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        Boolean(movies.length) && (
          <>
            <MovieGrid movies={movies} onSelect={onSelect} />
            {selectedMovie && (
              <MovieModal movie={selectedMovie} onClose={onClose} />
            )}
          </>
        )
      )}
    </>
  );
}
