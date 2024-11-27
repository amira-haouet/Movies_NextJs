import { Film, Smile, Tv, User } from "lucide-react"

export const movieItems = [
  {
    title: "Now Playing",
    url: "/dashboard/movies/now-playing", 
    icon: Film,
  },
  {
    title: "Popular",
    url: "/dashboard/movies/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "/dashboard/movies/top-rated", 
    icon: Smile,
  },
];

export const TVShowsItems = [
  {
    title: "On The Air",
    url: "/dashboard/shows/on-the-air", 
    icon: Tv,
  },
  {
    title: "Popular",
    url: "/dashboard/shows/popular", 
    icon: User,
  },
  {
    title: "Top Rated",
    url: "/dashboard/shows/top-rated", 
    icon: Smile,
  },
];
