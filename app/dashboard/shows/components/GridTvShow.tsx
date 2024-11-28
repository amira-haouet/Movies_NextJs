'use client'

import Image from 'next/image';
import { TVShow } from "@/app/entities/TVShow";
import Link from 'next/link';

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
          <Link href={`${show.id}`} key={show.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name || show.original_name || 'Aucun titre disponible'}
                width={200}
                height={300}
                className="w-full h-auto object-cover"
              />
              <div className="p-2">
                <h2 className="text-sm font-bold truncate">{show.name || show.original_name}</h2>
                <p className="text-xs text-gray-600 truncate">{show.overview}</p>
                <p className="mt-2 text-sm font-bold text-yellow-500">
                  Note : {show.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
