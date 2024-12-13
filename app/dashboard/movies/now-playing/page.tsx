'use client'
import GridMovie from "../components/GridMovie";
import { useFetchMovies } from "../useCase/useFetchMovies";

export default function NowPlayingMoviesPage() {
    const { movies, isLoading} = useFetchMovies("now-playing")
    return <GridMovie movies={movies || []} isLoading = {isLoading} />;
}
