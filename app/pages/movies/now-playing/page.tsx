import MediaGrid from "@/components/ui/MediaGridMovie";

export default function TopRatedMoviesPage() {
    return <MediaGrid url="/api/movies/now-playing" title="Top Rated Movies" />;
}
