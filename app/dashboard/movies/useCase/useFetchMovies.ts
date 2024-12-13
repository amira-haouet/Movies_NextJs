'use client'

import { Movie } from "@/app/entities/Movie";
import { MoviesRepositoryInternal } from "@/repositories/MoviesRepositoryInternal";
import { useQuery } from "@tanstack/react-query";

export const useFetchMovies = (category: "now-playing" | "popular" | "top-rated") => {
    const repository = new MoviesRepositoryInternal();

    const fetchMovies = async (): Promise<Movie[]> => {
        switch (category) {
            case "now-playing":
                return await repository.getNowPlayingMovies();
            case "popular":
                return await repository.getPopularMovies();
            case "top-rated":
                return await repository.getTopRatedMovies();
            default:
                throw new Error("Invalid category");
        }
    };

    const { data: movies, isLoading, isError } = useQuery<Movie[]>(
        {
            queryKey: ["movies", category],
            queryFn: fetchMovies,
        }
    );

    return { movies, isLoading, isError };
};
