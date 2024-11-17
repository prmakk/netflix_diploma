import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleCheck, Loader, SquarePlus, Star } from "lucide-react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import styles from "./MoviePage.module.scss";

import { useAuthStore } from "../../store/authUser";
import { useMovieStore } from "../../store/movies";
import Genre from "../../components/Genre/Genre";
import Movie from "../../components/Movie/Movie";
import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader";

const MoviePage: FC = () => {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";

    const { user } = useAuthStore();
    const {
        getOneMovie,
        oneMovieDetails,
        recommendedMovies,
        getRecommendedMovies,
        isLoading,
        addToFavorite,
    } = useMovieStore();

    const [_, setSwiper] = useState<any>(null);
    const [isMovieAdded, setIsMovieAdded] = useState<boolean>(false);

    const { movieId } = useParams();

    useEffect(() => {
        if (movieId) {
            getOneMovie(movieId);
            getRecommendedMovies(movieId);
        }
    }, [movieId, getOneMovie, getRecommendedMovies]);

    useEffect(() => {
        const checkMovie = () => {
            setIsMovieAdded(user?.favorites.includes(movieId!) ?? false);
        };
        checkMovie();
    }, [user?.favorites, movieId]);

    const handleAddMovie = () => {
        if (user?._id && movieId) {
            addToFavorite(user._id, movieId);
            setIsMovieAdded(true);
        }
    };

    const renderTrailer = () => {
        const trailer = oneMovieDetails?.videos.results.find(
            (item: any) => item.type === "Trailer"
        );

        return trailer ? (
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                height="100%"
                width="100%"
                controls
            />
        ) : (
            <p style={{ textAlign: "center" }}>
                (We apologize, the trailer is not available)
            </p>
        );
    };

    if (isLoading) {
        return (
            <div className="loader">
                <Loader color="red" size={30} />
            </div>
        );
    }

    return (
        <div className={styles.movie}>
            <SecondaryHeader />

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

                        <div className={styles.favorite}>
                            <button
                                onClick={handleAddMovie}
                                disabled={isMovieAdded}
                            >
                                {isMovieAdded ? (
                                    <span>
                                        Added to favorite
                                        <CircleCheck />
                                    </span>
                                ) : (
                                    <span>
                                        Add to favorite
                                        <SquarePlus />
                                    </span>
                                )}
                            </button>
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

                <div className={styles.recommended}>
                    <h3 className={styles.title}>You might like</h3>
                    <Swiper
                        loop={true}
                        onSwiper={(s) => setSwiper(s)}
                        slidesPerView={6}
                        spaceBetween={16}
                        breakpoints={{
                            300: { slidesPerView: 2, spaceBetween: 12 },
                            400: { slidesPerView: 3, spaceBetween: 12 },
                            768: { slidesPerView: 4, spaceBetween: 12 },
                            1024: { slidesPerView: 6, spaceBetween: 16 },
                        }}
                        modules={[Autoplay]}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                    >
                        {recommendedMovies?.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <Movie movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
