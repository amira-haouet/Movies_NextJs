'use client'
import GridMovie from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function NowPlayingMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/now-playing")
    return <GridMovie movies={movies} isLoading = {isLoading} />;
    return <GridMovie movies={movies} isLoading = {isLoading} />;
}
