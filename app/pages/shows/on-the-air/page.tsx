'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function OntheAirTvShowsPage() {
    const { tvShows, isLoading } = useFetchTvShows("/api/shows/on-the-air");
    return <GridTvShow shows={tvShows} isLoading={isLoading} />;
}
