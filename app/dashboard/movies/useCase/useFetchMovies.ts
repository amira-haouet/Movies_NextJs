'use client'

import { Movie } from "@/app/entities/Movie";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { MoviesRepositoryInternal } from "@/repositories/MoviesRepositoryInternal";
import { useQuery } from "@tanstack/react-query";

export const useFetchMovies = (category: "now-playing" | "popular" | "top-rated") => {
    const { moviesRepository } = useApplicationRepositoryContext();

    const fetchMovies = async (): Promise<Movie[]> => {
        switch (category) {
            case "now-playing":
                return await moviesRepository.getNowPlayingMovies();
            case "popular":
                return await moviesRepository.getPopularMovies();
            case "top-rated":
                return await moviesRepository.getTopRatedMovies();
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
