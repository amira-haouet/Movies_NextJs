'use client'
import { TVShow } from "@/app/entities/TVShow";
import { useEffect, useState } from "react";

export const useFetchTvShows = (url: string) => {
    const [tvShow, setTVShow] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error("Erreur lors de la récupération des données");
                const data: TVShow[] = await res.json();
                setTVShow(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {
        tvShows: tvShow, isLoading
    }
}



