import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import "./styles/normalize.css";
import "./styles/global.scss";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useAuthStore } from "./store/authUser";
import MoviePage from "./pages/MoviePage/MoviePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
    const { authCheck, isCheckingAuth, user } = useAuthStore();

    useEffect(() => {
        authCheck();
    }, []);

    if (isCheckingAuth) {
        return (
            <div className="loader">
                <Loader color="red" size={30} />
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/profile"
                    element={!user ? <Navigate to={"/"} /> : <ProfilePage />}
                />
                <Route
                    path="/search"
                    element={!user ? <Navigate to={"/"} /> : <SearchPage />}
                />
                <Route
                    path="/movie/:movieId"
                    element={!user ? <Navigate to={"/"} /> : <MoviePage />}
                ></Route>
            </Routes>

            <Toaster />
        </>
    );
}

export default App;
