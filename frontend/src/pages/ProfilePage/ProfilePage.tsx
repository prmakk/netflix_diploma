import { FC, useEffect, useState } from "react";

import styles from "./ProfilePage.module.scss";

import { useAuthStore } from "../../store/authUser";
import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader";
import { useMovieStore } from "../../store/movies";
import IMovie from "../../types/types";
import Movie from "../../components/Movie/Movie";

const ProfilePage: FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);
    const { user, getMe } = useAuthStore();
    const { getOneMovie } = useMovieStore();

    const fetchMovies = async (ids: string[]) => {
        try {
            const promises = ids.map((id) => getOneMovie(id));

            const movies = await Promise.all(promises);

            setFavoriteMovies(movies);
        } catch (error) {
            console.error("Ошибка при загрузке фильмов:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchMovies(user?.favorites!);
    }, [user?.favorites]);

    useEffect(() => {
        getMe(user?._id!);
    }, [user?._id!]);

    return (
        <div className={styles.profile}>
            <SecondaryHeader />

            <div className={styles.main}>
                <h3 className={styles.title}>
                    Welcome back, <span>{user?.username}</span>
                </h3>

                <hr />

                <div className={styles.favorites}>
                    <h3 className={styles.title}>Your favorites:</h3>

                    <div className={styles.grid}>
                        {favoriteMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
