'use client'
import GridMovie from "../components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function PopularMoviesPage() {
  const { movies, isLoading } = useFetchMovies("/api/movies/popular")
  return (
    <div>
      <GridMovie movies={movies} isLoading={isLoading} />
    </div>
  );
}
