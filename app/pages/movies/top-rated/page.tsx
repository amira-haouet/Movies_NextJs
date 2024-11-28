'use client'
import { useFetchMovies } from "../useCase/useFetchMovies";
import GridMovie from "@/app/pages/movies/components/GridMovie";

export default function TopRatedMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/top-rated")
    return <GridMovie movies={movies} isLoading = {isLoading} />;
}
