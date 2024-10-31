import { FC, useState } from "react";

import styles from "./AuthScreen.module.scss";
import { Link, useNavigate } from "react-router-dom";

const AuthScreen: FC = () => {
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/signup?email=${email}`);
    };

    return (
        <div className={styles.auth}>
            <header className={styles.header}>
                <Link to={"/"}>
                    <img src="netflix-logo.webp" alt="logo" />
                </Link>
                <button>
                    <Link to={"/login"}>Sign In</Link>
                </button>
            </header>

            <div className={styles.hero}>
                <h1 className={styles.title}>
                    Unlimited movies, TV shows, and more
                </h1>
                <p className={styles.subtitle}>
                    Watch anywhere. Cancel anytime.
                </p>

                <form className={styles.getstarted} onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">
                        <Link to={"/signup"}>Get started</Link>
                    </button>
                </form>
            </div>

            <div className={styles.main}>
                <div className={styles.block}>
                    <div className={styles.block__info}>
                        <h3 className={styles.block__info_title}>
                            Enjoy on your TV
                        </h3>
                        <p className={styles.block__info_subtitle}>
                            Watch on Smart TVs, Playstation, Xbox, Chromecast,
                            Apple TV, Blu-ray players, and more.
                        </p>
                    </div>
                    <div className={styles.block__image}>
                        <img src="tv.png" alt="tv" />
                        <video
                            src="hero-vid.m4v"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </div>

                <hr />

                <div className={`${styles.block} ${styles.inverted}`}>
                    <div className={styles.block__info}>
                        <h3 className={styles.block__info_title}>
                            Watch everywhere
                        </h3>
                        <p className={styles.block__info_subtitle}>
                            Stream unlimited movies and TV shows on your phone,
                            tablet, laptop, and TV.
                        </p>
                    </div>
                    <div className={styles.block__image_2}>
                        <img src="device-pile.png" alt="tv" />
                        <video
                            src="video-devices.m4v"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </div>

                <hr />

                <div className={styles.block}>
                    <div className={styles.block__info}>
                        <h3 className={styles.block__info_title}>
                            Create profiles for kids
                        </h3>
                        <p className={styles.block__info_subtitle}>
                            Send kids on adventures with their favorite
                            characters in a space made just for them—free with
                            your membership.
                        </p>
                    </div>
                    <div className={styles.block__image}>
                        <img src="kids.png" alt="tv" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
