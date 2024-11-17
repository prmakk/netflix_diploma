import { FC } from "react";

import styles from "./SecondaryHeader.module.scss";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const SecondaryHeader: FC = () => {
    return (
        <header className={styles.header}>
            <Link to={"/"}>
                <img src="/netflix-logo.webp" alt="logo" />
            </Link>

            <div className={styles.items}>
                <button>
                    <Link to={"/search"}>
                        <Search color="#fff" size={30} />
                    </Link>
                </button>

                <DropdownMenu />
            </div>
        </header>
    );
};

export default SecondaryHeader;
