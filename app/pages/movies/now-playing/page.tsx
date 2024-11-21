'use client'
import MediaGrid from "@/app/pages/movies/components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function NowPlayingMoviesPage() {
    const { movies, isLoading} = useFetchMovies("/api/movies/now-playing")
    return <MediaGrid movies={movies} isLoading = {isLoading} />;
}
