'use client';

import { Movie } from "@/app/entities/Movie";
import GridMovie from "../movies/components/GridMovie";
import GridTVShow from "../shows/components/GridTvShow";
import { useFetchDiscover } from "./useCase/useFetchDiscover";
import { TVShow } from "@/app/entities/TVShow";

export default function DiscoverPage() {
  const { data: movies, isLoading: moviesLoading, isError: moviesError } = useFetchDiscover("movies");
  const { data: tvShows, isLoading: tvLoading, isError: tvError } = useFetchDiscover("tvshows");

  if (moviesLoading || tvLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Chargement des données...</p>;
  }

  if (moviesError || tvError) {
    return <p className="text-center text-red-500">Erreur lors du chargement des données.</p>;
  }

  return (
    <div className="space-y-12 p-4">
      {/* Section pour les films */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Films Découvertes</h1>
        <GridMovie title="" movies={movies as Movie[] || []} isLoading={false} isHorizontal />
      </div>

      {/* Section pour les séries */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Séries Découvertes</h1>
        <GridTVShow title="" shows={tvShows as TVShow[] || []} isLoading={false} isHorizontal/>
      </div>
    </div>
  );
}
