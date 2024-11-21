"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { Movie } from "@/app/entities/Movie";


interface MediaGridProps {
  url: string;
  title?: string;
}

export default function MediaGrid({ url, title }: MediaGridProps) {
  const [media, setMedia] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data: Movie[] = await res.json(); // Use the Movie interface for the API response
        setMedia(data);
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
        {media.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ maxWidth: "200px" }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title || 'No title available'}
              width={500}
              height={750}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h2 className="text-sm font-bold">{movie.title}</h2>
              <p className="text-xs text-gray-600 line-clamp-3">{movie.overview}</p>
              <p className="mt-2 text-sm font-bold text-yellow-500">
                Rating: {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
