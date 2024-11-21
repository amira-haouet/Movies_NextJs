import TVShowGrid from "@/components/ui/MediaGrivTvShow";

export default function TopRatedMoviesPage() {
    return <TVShowGrid url="/api/shows/top-rated" title="Top Rated Movies" />;
}
