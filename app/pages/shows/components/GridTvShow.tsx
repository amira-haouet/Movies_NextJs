'use client'

import Image from 'next/image';
import { TVShow } from "@/app/entities/TVShow";

interface GridTVShowProps {
  title?: string;
  shows: TVShow[]; 
  isLoading: boolean;
}

export default function GridTVShow({ title, isLoading, shows }: GridTVShowProps) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des données...</p>;
  }

  return (
    <div className="p-4">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {shows.map((show) => (
          <div
            key={show.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ maxWidth: "200px" }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.name || show.original_name || 'No title available'}
              width={500}
              height={750}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h2 className="text-sm font-bold">{show.name || show.original_name}</h2>
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
