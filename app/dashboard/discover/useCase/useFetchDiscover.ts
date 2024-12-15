'use client';

import { Movie } from "@/app/entities/Movie";
import { TVShow } from "@/app/entities/TVShow";
import { DiscoverRepositoryInternal } from "@/repositories/DiscoverRepositoryInternal";
import { useQuery } from "@tanstack/react-query";

type DiscoverCategory = "movies" | "tvshows";

export const useFetchDiscover = (category: DiscoverCategory) => {
  const repository = new DiscoverRepositoryInternal();

  const fetchDiscover = async (): Promise<Movie[] | TVShow[]> => {
    switch (category) {
      case "movies":
        return await repository.getMovies();
      case "tvshows":
        return await repository.getTVShows();
      default:
        throw new Error("Invalid category");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["discover", category],
    queryFn: fetchDiscover,
  });

  return { data, isLoading, isError };
};
