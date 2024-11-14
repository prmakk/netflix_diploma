import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { MoveLeft, MoveRight, Play, Star } from "lucide-react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import styles from "./Slider.module.scss";
import { useMovieStore } from "../../store/movies";

const Slider: FC = () => {
    const MOVIE_BACKDROP = "https://image.tmdb.org/t/p/w1280/";
    const [swiper, setSwiper] = useState<any>(null);
    const { getSliderMovies, sliderMovies } = useMovieStore();

    useEffect(() => {
        getSliderMovies();
    }, []);
    return (
        <div className={styles.sliderMovies}>
            <div className={styles.sliderMovies__nav}>
                <MoveLeft
                    size={100}
                    color="#fff"
                    onClick={() => swiper.slidePrev()}
                />
                <MoveRight
                    size={100}
                    color="#fff"
                    onClick={() => swiper.slideNext()}
                />
            </div>

            {sliderMovies && (
                <Swiper
                    loop={true}
                    onSwiper={(s) => setSwiper(s)}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                    {sliderMovies.map((movie) => (
                        <SwiperSlide key={movie.poster_path}>
                            <div className={styles.sliderMovies__movie}>
                                <div className={styles.image}>
                                    <img
                                        src={
                                            MOVIE_BACKDROP + movie.backdrop_path
                                        }
                                        alt="poster"
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info__title}>
                                        <p>{movie.title}</p>
                                    </div>
                                    <div className={styles.info__subtitle}>
                                        <p>{movie.overview}</p>
                                    </div>

                                    <div className={styles.info__additional}>
                                        <div className={styles.vote}>
                                            <Star
                                                size={30}
                                                color="#fecf02"
                                                fill="#fecf02"
                                            />
                                            <p>
                                                {movie.vote_average.toFixed(1)}
                                            </p>
                                        </div>
                                        <p>{movie.release_date.substr(0, 4)}</p>
                                        <Link to={`/movie/${movie.id}`}>
                                            <Play size={30} fill="#000" />
                                            Play
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Slider;
