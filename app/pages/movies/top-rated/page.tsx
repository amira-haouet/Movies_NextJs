'use client'
import GridMovie from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function TopRatedMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/top-rated")
    return <GridMovie movies={movies} isLoading = {isLoading} />;
    return <GridMovie movies={movies} isLoading = {isLoading} />;
}
