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
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [isModal, setModal] = useState<boolean>(false);

  const onSubmit = async (formData: FormData): Promise<void> => {
    const query = (formData.get("query") as string).trim();

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
    } catch (e) {
      setError(true);
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  const onSelect = (movie: Movie) => {
    setModal(true);
    setSelectedMovie(movie);
  };
  const onClose = () => setModal(false);

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
            {isModal && selectedMovie && (
              <MovieModal movie={selectedMovie} onClose={onClose} />
            )}
          </>
        )
      )}
    </>
  );
}
