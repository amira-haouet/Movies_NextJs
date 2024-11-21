'use client'
import MediaGrid from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function TopRatedMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/top-rated")
    return <MediaGrid movies={movies} isLoading = {isLoading} />;
}
