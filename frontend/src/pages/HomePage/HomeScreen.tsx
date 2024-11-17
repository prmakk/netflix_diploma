import { FC, useEffect } from "react";

import { Link } from "react-router-dom";
import { Loader, Search } from "lucide-react";

import styles from "./HomeScreen.module.scss";
import Slider from "../../components/Slider/Slider";
import Movie from "../../components/Movie/Movie";
import { useMovieStore } from "../../store/movies";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const HomeScreen: FC = () => {
    const {
        getBestMovies,
        getTrendingMovies,
        getUpcomingMovies,
        bestMovies,
        trendingMovies,
        upcomingMovies,
        isLoading,
    } = useMovieStore();

    useEffect(() => {
        getTrendingMovies();
        getBestMovies();
        getUpcomingMovies();
    }, []);

    if (isLoading) {
        return (
            <div className="loader">
                <Loader color="red" size={30} />
            </div>
        );
    }

    return (
        <div className={styles.home}>
            <header className={styles.header}>
                <Link to={"/"}>
                    <img src="netflix-logo.webp" alt="logo" />
                </Link>

                <nav className={styles.nav}>
                    <div className={styles.links}>
                        <Link to={"/"}>Best of all time</Link>
                        <Link to={"/"}>Trending</Link>
                        <Link to={"/"}>Upcoming</Link>
                    </div>
                </nav>

                <div className={styles.items}>
                    <button>
                        <Link to={"/search"}>
                            <Search color="#fff" size={30} />
                        </Link>
                    </button>

                    <DropdownMenu />
                </div>
            </header>

            <Slider />

            <section className={styles.films}>
                <h3 className={styles.title}>Trending</h3>
                <hr />
                <div className={styles.grid}>
                    {trendingMovies &&
                        trendingMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
            </section>

            <section className={styles.films}>
                <h3 className={styles.title}>Best of all time</h3>
                <hr />
                <div className={styles.grid}>
                    {bestMovies &&
                        bestMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
            </section>

            <section className={styles.films}>
                <h3 className={styles.title}>Upcoming</h3>
                <hr />
                <div className={styles.grid}>
                    {upcomingMovies &&
                        upcomingMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
            </section>
        </div>
    );
};

export default HomeScreen;
