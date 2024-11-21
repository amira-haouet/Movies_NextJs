'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function TopRatedTvShowsPage() {
    const { tvShows, isLoading } = useFetchTvShows("/api/shows/top-rated");
    return <GridTvShow shows={tvShows} isLoading={isLoading} />;
}
