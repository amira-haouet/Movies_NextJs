'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from "@/app/entities/Movie";

interface GridMovieProps {
  title?: string;
  movies: Movie[]; // List of movies
  isLoading: boolean;
}

export default function GridMovie({ title, isLoading, movies }: GridMovieProps) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des données...</p>;
  }

  return (
    <div className="p-4">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
        {movies.map((movie) => (
          <Link href={`${movie.id}`} key={movie.id}>
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
