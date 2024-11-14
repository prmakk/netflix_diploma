import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, LogOut, Search, Star } from "lucide-react";
import ReactPlayer from "react-player";

import styles from "./MoviePage.module.scss";

import { useAuthStore } from "../../store/authUser";
import { useMovieStore } from "../../store/movies";
import Genre from "../../components/Genre/Genre";

const MoviePage: FC = () => {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";
    const { id } = useParams();
    const { logout } = useAuthStore();
    const { getOneMovie, oneMovieDetails, isLoading } = useMovieStore();

    useEffect(() => {
        getOneMovie(id!);
    }, [id]);

    if (isLoading) {
        return (
            <div className="loader">
                <Loader color="red" size={30} />
            </div>
        );
    }

    const renderTrailer = () => {
        const trailer = oneMovieDetails?.videos.results.find(
            (item: any) => item.type === "Trailer"
        );

        if (trailer) {
            return (
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer.key}`}
                    height="100%"
                    width="100%"
                    controls
                />
            );
        } else {
            return (
                <p style={{ textAlign: "center" }}>
                    (We apologize, the trailer is not available)
                </p>
            );
        }
    };

    return (
        <div className={styles.movie}>
            <header className={styles.header}>
                <Link to={"/"}>
                    <img src="/netflix-logo.webp" alt="logo" />
                </Link>
                <div className={styles.items}>
                    <button>
                        <Link to={"/search"}>
                            <Search color="#fff" size={30} />
                        </Link>
                    </button>

                    <button onClick={logout}>
                        <LogOut color="#fff" size={30} />
                    </button>
                </div>
            </header>

            <div className={styles.main}>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <img
                            src={`${IMAGE_URL}${oneMovieDetails?.poster_path}`}
                            alt="poster"
                        />
                    </div>

                    <div className={styles.details}>
                        <div className={styles.title}>
                            <p>{oneMovieDetails?.title}</p>
                            <div className={styles.rating}>
                                <div className={styles.star}>
                                    <Star
                                        size={30}
                                        color="#fecf02"
                                        fill="#fecf02"
                                    />
                                    {oneMovieDetails?.vote_average}
                                </div>
                                <p>({oneMovieDetails?.vote_count} rated)</p>
                            </div>
                        </div>

                        <hr />

                        <div className={styles.subtitle}>
                            <p>
                                Year:{" "}
                                {oneMovieDetails?.release_date.substr(0, 4)}
                            </p>
                            <p>
                                Countries:{" "}
                                {oneMovieDetails?.production_countries
                                    //@ts-ignore
                                    .map((country) => country.name)
                                    .join(", ")}
                            </p>
                            <div className={styles.genres}>
                                Genres:{" "}
                                {oneMovieDetails
                                    ? oneMovieDetails.genres.map((genre) => (
                                          <Genre
                                              //@ts-ignore
                                              key={genre.name}
                                              //@ts-ignore
                                              genre={genre.name}
                                          />
                                      ))
                                    : "No genres provided"}
                            </div>
                            <p>
                                Release date:{" "}
                                {oneMovieDetails?.release_date
                                    .split("-")
                                    .reverse()
                                    .join(".")}
                            </p>
                            <p>
                                Runtime:{" "}
                                {(oneMovieDetails?.runtime! / 60).toFixed(1)}{" "}
                                hours
                            </p>
                            <p>Overview: {oneMovieDetails?.overview}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.trailer}>{renderTrailer()}</div>
            </div>
        </div>
    );
};

export default MoviePage;
