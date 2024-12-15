'use client';

import { Movie } from "@/app/entities/Movie";
import { useApplicationRepositoryContext } from "@/repositories/ApplicationRepositoryContext";
import { useQuery } from "@tanstack/react-query";
export const useFetchMovieDetails = (id: string) => {
    const { moviesRepository } = useApplicationRepositoryContext();

  const fetchMovieDetails = async (): Promise<Movie> => {
    return await moviesRepository.getMovieDetails(id);
  };

  const { data: movie, isLoading, isError } = useQuery<Movie>({
    queryKey: ["movieDetails", id],
    queryFn: fetchMovieDetails,
    enabled: !!id,
  });
  return { movie, isLoading, isError };
};
