import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Loader, Search } from "lucide-react";

import styles from "./HomeScreen.module.scss";
import Slider from "../../components/Slider/Slider";
import Movie from "../../components/Movie/Movie";
import { useMovieStore } from "../../store/movies";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Pagination from "../../components/Pagination/Pagination";

const HomeScreen: FC = () => {
    const [trendingPage, setTrendingPage] = useState<number>(1);
    const [bestPage, setBestPage] = useState<number>(1);
    const [upcomingPage, setUpcomingPage] = useState<number>(1);
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
        getTrendingMovies(trendingPage);
    }, [trendingPage]);

    useEffect(() => {
        getBestMovies(bestPage);
    }, [bestPage]);

    useEffect(() => {
        getUpcomingMovies(upcomingPage);
    }, [upcomingPage]);

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

            <section className={styles.films} id="trending">
                <h3 className={styles.title}>Trending</h3>
                <hr />
                <div className={styles.grid}>
                    {trendingMovies &&
                        trendingMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
                <Pagination
                    onPageChange={setTrendingPage}
                    currentPage={trendingPage}
                    scrollTo={"trending"}
                />
            </section>

            <section className={styles.films} id="best">
                <h3 className={styles.title}>Best of all time</h3>
                <hr />
                <div className={styles.grid}>
                    {bestMovies &&
                        bestMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
                <Pagination
                    onPageChange={setBestPage}
                    currentPage={bestPage}
                    scrollTo={"best"}
                />
            </section>

            <section className={styles.films} id="upcoming">
                <h3 className={styles.title}>Upcoming</h3>
                <hr />
                <div className={styles.grid}>
                    {upcomingMovies &&
                        upcomingMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                </div>
                <Pagination
                    onPageChange={setUpcomingPage}
                    currentPage={upcomingPage}
                    scrollTo={"upcoming"}
                />
            </section>
        </div>
    );
};

export default HomeScreen;
