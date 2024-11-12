import { create } from "zustand";
import IMovie from "../types/types";
import axios from "axios";
import toast from "react-hot-toast";

interface IMovieStore {
    sliderMovies: IMovie[] | null;
    getSliderMovies: () => Promise<void>;
}

export const useMovieStore = create<IMovieStore>((set) => ({
    sliderMovies: null,
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
}));
