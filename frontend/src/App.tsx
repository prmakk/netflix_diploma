import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/normalize.css";
import "./styles/global.scss";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>

            <Toaster />
        </>
    );
}

export default App;
