import { FC } from "react";

import styles from "./HomeScreen.module.scss";
import Slider from "../../components/Slider/Slider";

const HomeScreen: FC = () => {
    return (
        <div className={styles.home}>
            <Slider />
        </div>
    );
};

export default HomeScreen;
