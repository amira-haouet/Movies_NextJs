'use client'
import { Movie } from "@/app/entities/Movie";
import { useEffect, useState } from "react";

export const useFetchMovies = (url: string) => {
    const [movie, setMovie] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Erreur lors de la récupération des données");
                const data: Movie[] = await res.json();
                setMovie(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {
        movies: movie, isLoading
    }
}



