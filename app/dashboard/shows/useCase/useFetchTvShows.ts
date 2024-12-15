'use client'

import { TVShow } from "@/app/entities/TVShow";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { useQuery } from "@tanstack/react-query";

export const useFetchTvShows = (category: "on-the-air" | "popular" | "top-rated") => {
    const { tvShowsRepository } = useApplicationRepositoryContext();

    const fetchTVShow = async (): Promise<TVShow[]> => {
        switch (category) {
            case "on-the-air":
                return await tvShowsRepository.getOnTheAirTVShow();
            case "popular":
                return await tvShowsRepository.getPopularTVShow();
            case "top-rated":
                return await tvShowsRepository.getTopRatedTVShow();
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

