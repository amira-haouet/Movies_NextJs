'use client';

import { useEffect, useState } from "react";
import { Movie } from "@/app/entities/Movie";
import GridMovie from "../movies/components/GridMovie";
import GridTVShow from "../shows/components/GridTvShow";
import { useFetchDiscover } from "./useCase/useFetchDiscover";
import { TVShow } from "@/app/entities/TVShow";
import { searchTerm$ } from "@/app/store/searchObservable";

export default function DiscoverPage() {
  const { data: movies, isLoading: moviesLoading, isError: moviesError } = useFetchDiscover("movies");
  const { data: tvShows, isLoading: tvLoading, isError: tvError } = useFetchDiscover("tvshows");

  const [searchTerm, setSearchTerm] = useState<string>("");

  // S'abonner à l'observable de recherche
  useEffect(() => {
    const subscription = searchTerm$.subscribe((term) => setSearchTerm(term));
    return () => subscription.unsubscribe();
  }, []);

  if (moviesLoading || tvLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Chargement des données...</p>;
  }

  if (moviesError || tvError) {
    return <p className="text-center text-red-500">Erreur lors du chargement des données.</p>;
  }

  // Filtrer les films et séries par le terme de recherche
  const filteredMovies = (movies as Movie[] || []).filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTVShows = (tvShows as TVShow[] || []).filter((show) =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 p-4">

      {/* Section pour les films */}
      {filteredMovies.length > 0 && (
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Films Découvertes</h1>
        <GridMovie title="" movies={filteredMovies} isLoading={false} isHorizontal={filteredMovies.length > 3}/>
      </div>
      )}

      {/* Section pour les séries */}
      {filteredTVShows.length > 0 && (
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Séries Découvertes</h1>
        <GridTVShow title="" shows={filteredTVShows} isLoading={false} isHorizontal={filteredTVShows.length > 3}/>
      </div>
       )}

    </div>
    
  );
}
