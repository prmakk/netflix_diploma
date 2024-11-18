import { create } from "zustand";
import IMovieDetails from "../types/types";
import IMovie from "../types/types";
import axios from "axios";
import toast from "react-hot-toast";

interface IMovieStore {
    isLoading: boolean;
    sliderMovies: IMovie[] | null;
    bestMovies: IMovie[] | null;
    trendingMovies: IMovie[] | null;
    upcomingMovies: IMovie[] | null;
    recommendedMovies: IMovie[] | null;
    oneMovieDetails: IMovieDetails | null;
    getSliderMovies: () => Promise<void>;
    getBestMovies: (page: number) => Promise<void>;
    getTrendingMovies: (page: number) => Promise<void>;
    getUpcomingMovies: (page: number) => Promise<void>;
    getOneMovie: (id: string) => Promise<IMovie>;
    getRecommendedMovies: (id: string) => Promise<void>;
    addToFavorite: (userId: string, movieId: string) => Promise<void>;
}

export const useMovieStore = create<IMovieStore>((set) => ({
    isLoading: false,
    sliderMovies: null,
    bestMovies: null,
    trendingMovies: null,
    upcomingMovies: null,
    recommendedMovies: null,
    oneMovieDetails: null,
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
    getBestMovies: async (page) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd`
            );
            set({ bestMovies: response.data.results, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            toast.error("An error occured, try again later");
        }
    },
    getTrendingMovies: async (page) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd`
            );
            set({ trendingMovies: response.data.results, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            toast.error("An error occured, try again later");
        }
    },
    getUpcomingMovies: async (page) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=d42d7d1e0db582adac2ddb0f20141cfd`
            );
            set({ upcomingMovies: response.data.results, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            toast.error("An error occured, try again later");
        }
    },
    getOneMovie: async (id) => {
        set({ oneMovieDetails: null, isLoading: true });
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=d42d7d1e0db582adac2ddb0f20141cfd&append_to_response=videos`
            );
            set({ oneMovieDetails: response.data, isLoading: false });
            return response.data;
        } catch (error: any) {
            set({ isLoading: false });
            toast.error("An error occured, try again later");
        }
    },
    getRecommendedMovies: async (id) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=d42d7d1e0db582adac2ddb0f20141cfd`
            );
            set({ recommendedMovies: response.data.results });
        } catch (error: any) {
            toast.error("An error occured, try again later");
        }
    },
    addToFavorite: async (userId, movieId) => {
        try {
            const response = await axios.post("/api/v1/auth/addfavorite", {
                userId: userId,
                movieId: movieId,
            });
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    },
}));
