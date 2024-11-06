import { FC, useState } from "react";

import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <div className={styles.login}>
            <header className={styles.header}>
                <Link to={"/"}>
                    <img src="netflix-logo.webp" alt="logo" />
                </Link>
            </header>

            <div className={styles.container}>
                <h1 className={styles.title}>Sign In</h1>

                <form className={styles.form} onSubmit={handleSignIn}>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="*******"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.button}>Sign In</button>
                </form>

                <div className={styles.member}>
                    Don't have an account?
                    <Link to={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
