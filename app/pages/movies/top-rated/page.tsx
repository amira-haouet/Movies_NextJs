"use client";

import { Movie } from "@/app/entities/Movie";
import { useEffect, useState } from "react";

export default function TopRatedTVShows() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/movies/top-rated");
        const data = await res.json();
        setMovies(data); // Remplir l'état avec les données de l'API
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des films...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          style={{ maxWidth: "200px" }} // Limite la largeur de chaque carte
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || movie.original_title}
            className="w-full h-auto"
          />
          <div className="p-2">
            <h2 className="text-sm font-bold">
              {movie.title || movie.original_title}
            </h2>
            <p className="text-xs text-gray-600 line-clamp-3">
              {movie.overview}
            </p>
            <p className="mt-2 text-sm font-bold text-yellow-500">
              Rating: {movie.vote_average}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
