import { create } from "zustand";
import IMovie from "../types/types";
import axios from "axios";
import toast from "react-hot-toast";

interface IMovieStore {
    sliderMovies: IMovie[] | null;
    bestMovies: IMovie[] | null;
    trendingMovies: IMovie[] | null;
    upcomingMovies: IMovie[] | null;
    getSliderMovies: () => Promise<void>;
    getBestMovies: () => Promise<void>;
    getTrendingMovies: () => Promise<void>;
    getUpcomingMovies: () => Promise<void>;
}

export const useMovieStore = create<IMovieStore>((set) => ({
    sliderMovies: null,
    bestMovies: null,
    trendingMovies: null,
    upcomingMovies: null,
    getSliderMovies: async () => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd"
            );
            set({ sliderMovies: response.data.results });
        } catch (error: any) {
            toast.error("An error occured, try again later");
        }
    },
    getBestMovies: async () => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/movie/top_rated?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd"
            );
            set({ bestMovies: response.data.results });
        } catch (error: any) {
            toast.error("An error occured, try again later");
        }
    },
    getTrendingMovies: async () => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/movie/now_playing?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd"
            );
            set({ trendingMovies: response.data.results });
        } catch (error: any) {
            toast.error("An error occured, try again later");
        }
    },
    getUpcomingMovies: async () => {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/movie/upcoming?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd"
            );
            set({ upcomingMovies: response.data.results });
        } catch (error: any) {
            toast.error("An error occured, try again later");
        }
    },
}));
