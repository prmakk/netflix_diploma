import { FC } from "react";

import styles from "./HomeScreen.module.scss";
import { useAuthStore } from "../../store/authUser";

const HomeScreen: FC = () => {
    const { logout } = useAuthStore();
    return (
        <div className={styles.home}>
            HomeScreen <button onClick={logout}>Logout</button>
        </div>
    );
};

export default HomeScreen;
