import { FC, useEffect, useState } from "react";

import styles from "./SearchPage.module.scss";

import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader";
import useDebounce from "../../hooks/useDebounce";
import { useMovieStore } from "../../store/movies";
import Movie from "../../components/Movie/Movie";

const SearchPage: FC = () => {
    const [input, setInput] = useState<string>("");

    const { getSearchedMovies, searchedMovies, clearSearchedMovies } =
        useMovieStore();

    const debouncedInput = useDebounce(input, 1000);

    useEffect(() => {
        if (input.trim() !== "") {
            getSearchedMovies(debouncedInput.debouncedValue);
        }
    }, [debouncedInput.debouncedValue]);

    useEffect(() => {
        clearSearchedMovies();
    }, []);

    return (
        <div className={styles.search}>
            <SecondaryHeader />

            <div className={styles.main}>
                <form>
                    <label htmlFor="search">Search</label>
                    <hr />
                    <input
                        type="text"
                        id="search"
                        placeholder="Stranger Things"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>

                <div className={styles.grid}>
                    {searchedMovies?.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
