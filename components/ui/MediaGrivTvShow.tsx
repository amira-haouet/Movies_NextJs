"use client";

import { useEffect, useState } from "react";

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

interface TVShowGridProps {
  url: string;
  title?: string;
}

export default function TVShowGrid({ url, title }: TVShowGridProps) {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setTvShows(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des données...</p>;
  }

  return (
    <div className="p-4">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {tvShows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ maxWidth: "200px" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.name || show.original_name}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h2 className="text-sm font-bold">
                {show.name || show.original_name}
              </h2>
              <p className="text-xs text-gray-600 line-clamp-3">{show.overview}</p>
              <p className="mt-2 text-sm font-bold text-yellow-500">
                Rating: {show.vote_average}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                First aired: {show.first_air_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
