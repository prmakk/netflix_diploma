import { FC } from "react";

import { Link } from "react-router-dom";
import { LogOut, Search } from "lucide-react";

import styles from "./HomeScreen.module.scss";
import Slider from "../../components/Slider/Slider";
import { useAuthStore } from "../../store/authUser";

const HomeScreen: FC = () => {
    const { logout } = useAuthStore();

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

                    <button onClick={logout}>
                        <LogOut color="#fff" size={30} />
                    </button>
                </div>
            </header>
            <Slider />
        </div>
    );
};

export default HomeScreen;
