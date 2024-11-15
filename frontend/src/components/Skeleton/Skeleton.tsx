import { FC } from "react";

import styles from "./Skeleton.module.scss";

interface ISkeleton {
    maxWidth: string;
    ratio: string;
}

const Skeleton: FC<ISkeleton> = ({ maxWidth, ratio }) => {
    return (
        <div
            className={styles.skeleton}
            style={{ maxWidth: `${maxWidth}px`, aspectRatio: `${ratio}` }}
        ></div>
    );
};

export default Skeleton;
