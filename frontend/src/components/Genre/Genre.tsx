import { FC } from "react";

import styles from "./Genre.module.scss";

interface IGenre {
    genre: string;
}

const Genre: FC<IGenre> = ({ genre }) => {
    return <div className={styles.genre}>{genre}</div>;
};

export default Genre;
