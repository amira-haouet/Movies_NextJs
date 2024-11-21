'use client'
import GridMovie from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";
import ThemeToggle from "@/components/ui/themeToggle";

export default function PopularMoviesPage() {
  const { movies, isLoading } = useFetchMovies("/api/movies/popular")
  return (
    <div>
      <ThemeToggle />

      <GridMovie movies={movies} isLoading={isLoading} />
    </div>
  );
}
