'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function OntheAirTvShowsPage() {
    const { TVShows, isLoading } = useFetchTvShows("on-the-air");
    return <GridTvShow shows={TVShows || []} isLoading={isLoading} />;
}
