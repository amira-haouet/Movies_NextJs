'use client';

import { TVShow } from "@/app/entities/TVShow";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { TVShowRepositoryInternal } from "@/repositories/TVShowRepositoryInternal";
import { useQuery } from "@tanstack/react-query";
export const useFetchTVShowDetails = (id: string) => {
    const { tvShowsRepository } = useApplicationRepositoryContext();

  const fetchTVShowDetails = async (): Promise<TVShow> => {
    return await tvShowsRepository.getTVShowDetails(id);
  };

  const { data: TVShow, isLoading, isError } = useQuery<TVShow>({
    queryKey: ["TVShowDetails", id],
    queryFn: fetchTVShowDetails,
    enabled: !!id,
  });
  return { TVShow, isLoading, isError };
};
