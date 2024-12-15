'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from "@/app/entities/TVShow";
import { useEffect, useState } from 'react';
import { searchTerm$ } from '@/app/store/searchObservable';

interface GridTVShowProps {
  title?: string;
  shows: TVShow[];
  isLoading: boolean;
  isHorizontal?: boolean; // Option pour le scroll horizontal
}

export default function GridTVShow({ title, isLoading, shows, isHorizontal }: GridTVShowProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const subscription = searchTerm$.subscribe((term) => setSearchTerm(term));
    return () => subscription.unsubscribe(); 
  }, []);
  
  if (isLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Chargement des données...</p>;
  }

  const generateStars = (rating: number) => {
    const stars = Math.round(rating / 2);
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={index < stars ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}
        >
          ★
        </span>
      ));
  };

  // Filtrage dynamique des films
  const filteredTVShow = shows.filter((show) =>
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {title && (
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h1>
      )}
      <div
        className={`${
          isHorizontal
            ? "flex gap-6 overflow-x-auto scrollbar-hide p-3"
            : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        }`}
      >
        {filteredTVShow.map((show) => (
          <Link href={`/dashboard/shows/${show.id}`} key={show.id}>
            <div
              data-testid="show-card"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 flex flex-col h-full"
              style={{ minWidth: isHorizontal ? "200px" : "auto" }} 
            >
              <div className="w-full aspect-[2/3] overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt={show.name || 'No title available'}
                  width={500}
                  height={750}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2">
                  {show.name || show.original_name}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mt-2">
                  {show.overview}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-sm">{generateStars(show.vote_average)}</div>
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {show.vote_average.toFixed(1)} / 10
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
