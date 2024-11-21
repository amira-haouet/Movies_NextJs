'use client'
import MediaGrid from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function PopularMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/popular")
    return <MediaGrid movies={movies} isLoading = {isLoading} />;
}
