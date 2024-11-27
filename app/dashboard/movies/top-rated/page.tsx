'use client'
import GridMovie from "../components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function TopRatedMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/top-rated")
    return <GridMovie movies={movies} isLoading = {isLoading} />;
}