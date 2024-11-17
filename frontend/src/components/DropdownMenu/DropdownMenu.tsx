import { FC, useState } from "react";
import { Ellipsis, EllipsisVertical, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./DropdownMenu.module.scss";

import { useAuthStore } from "../../store/authUser";

const DropdownMenu: FC = () => {
    const { logout } = useAuthStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const handleMenu = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <button onClick={handleMenu}>
                {isDropdownOpen ? (
                    <EllipsisVertical color="#fff" size={30} />
                ) : (
                    <Ellipsis color="#fff" size={30} />
                )}
            </button>

            {isDropdownOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.item}>
                        <Link to={"/profile"}>
                            <button className={styles.button}>
                                Profile
                                <User color="#fff" size={20} />
                            </button>
                        </Link>
                    </div>

                    <div className={styles.item}>
                        <button onClick={logout} className={styles.button}>
                            Logout <LogOut color="#fff" size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DropdownMenu;
