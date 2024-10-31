import { FC, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SignUpPage.module.scss";
import { useAuthStore } from "../../store/authUser";

const SignUpPage: FC = () => {
    const { searchParams } = new URL(window.location.href);
    const emailValue = searchParams.get("email");
    const [email, setEmail] = useState<string>(emailValue || "");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { signup } = useAuthStore();

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        signup({ email, username, password });
    };

    return (
        <div className={styles.signup}>
            <header className={styles.header}>
                <Link to={"/"}>
                    <img src="netflix-logo.webp" alt="logo" />
                </Link>
            </header>

            <div className={styles.container}>
                <h1 className={styles.title}>Sign Up</h1>

                <form className={styles.form} onSubmit={handleSignUp}>
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
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Johny"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            placeholder="*******"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.button}>Sign Up</button>
                </form>

                <div className={styles.member}>
                    Already a member?
                    <Link to={"/login"}>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
