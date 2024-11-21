"use client";

import { useEffect, useState } from "react";

interface MediaGridProps {
  url: string;
  title?: string;
}

export default function MediaGrid({ url, title }: MediaGridProps) {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
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
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ maxWidth: "200px" }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title || item.original_title || item.name}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h2 className="text-sm font-bold">
                {item.title || item.original_title || item.name}
              </h2>
              <p className="text-xs text-gray-600 line-clamp-3">{item.overview}</p>
              <p className="mt-2 text-sm font-bold text-yellow-500">
                Rating: {item.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
