'use client'

import { TVShow } from "@/app/entities/TVShow";
import { TVShowRepositoryInternal } from "@/repositories/TVShowRepositoryInternal";
import { useQuery } from "@tanstack/react-query";

export const useFetchTvShows = (category: "on-the-air" | "popular" | "top-rated") => {
    const repository = new TVShowRepositoryInternal();

    const fetchTVShow = async (): Promise<TVShow[]> => {
        switch (category) {
            case "on-the-air":
                return await repository.getOnTheAirTVShow();
            case "popular":
                return await repository.getPopularTVShow();
            case "top-rated":
                return await repository.getTopRatedTVShow();
            default:
                throw new Error("Invalid category");
        }
    };

    const { data: TVShows, isLoading, isError } = useQuery<TVShow[]>(
        {
            queryKey: ["TVShows", category],
            queryFn: fetchTVShow,
        }
    );

    return { TVShows, isLoading, isError };
}

