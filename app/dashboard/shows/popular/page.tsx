'use client';

import GridTvShow from "../components/GridTvShow";
import { useFetchTvShows } from "../useCase/useFetchTvShows";

export default function PopularTvShowsPage() {
    const { TVShows, isLoading } = useFetchTvShows("popular");
    return <GridTvShow shows={TVShows || []} isLoading={isLoading} />;
}
