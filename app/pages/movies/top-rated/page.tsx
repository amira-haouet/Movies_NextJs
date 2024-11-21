import MediaGrid from "@/components/ui/MediaGridMovie";

export default function TopRatedMoviesPage() {
  return <MediaGrid url="/api/movies/top-rated" title="Top Rated Movies" />;
}
