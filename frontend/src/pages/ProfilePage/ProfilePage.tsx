import { FC, useEffect } from "react";

import styles from "./ProfilePage.module.scss";
import { useAuthStore } from "../../store/authUser";

const ProfilePage: FC = () => {
    const { user, getMe } = useAuthStore();

    useEffect(() => {
        getMe(user?._id!);
    }, []);

    return (
        <div className={styles.profile}>
            {user?.favorites.map((id) => (
                <p>{id}</p>
            ))}
        </div>
    );
};

export default ProfilePage;
