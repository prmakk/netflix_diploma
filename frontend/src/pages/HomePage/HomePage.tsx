import { FC, useState } from "react";

import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";

const HomePage: FC = () => {
    const { user } = useAuthStore();
    return user ? <HomeScreen /> : <AuthScreen />;
};

export default HomePage;
