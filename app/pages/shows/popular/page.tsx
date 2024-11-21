'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function PopularTvShowsPage() {
    const { tvShows, isLoading } = useFetchTvShows("/api/shows/popular");
    return <GridTvShow shows={tvShows} isLoading={isLoading} />;
}
