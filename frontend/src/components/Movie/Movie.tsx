import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";

import styles from "./Movie.module.scss";
import IMovie from "../../types/types";
import Skeleton from "../Skeleton/Skeleton";

interface Props {
    movie: IMovie;
}

const Movie: FC<Props> = ({ movie }) => {
    const IMAGE_URL = "https://image.tmdb.org/t/p/w400/";
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

    return (
        <Link to={`/movie/${movie.id}`} className={styles.movie}>
            {isImageLoading && <Skeleton maxWidth="300" ratio="2/3" />}
            <div
                className={styles.poster}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    style={{ display: isImageLoading ? "none" : "block" }}
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt="poster"
                    onLoad={() => setIsImageLoading(false)}
                />
                {isHovered && <Play size={50} color="#fff" fill="#fff" />}
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{movie.title}</p>
                <div className={styles.additional}>
                    <p className={styles.rating}>
                        {movie.vote_average.toFixed(1)}
                        <Star color="#fecf02" fill="#fecf02" />
                    </p>
                    <p className={styles.year}>
                        {movie.release_date.slice(0, 4)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Movie;
