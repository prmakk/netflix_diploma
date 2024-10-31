import { FC, useState } from "react";

import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";

const HomePage: FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    return isAuth ? <HomeScreen /> : <AuthScreen />;
};

export default HomePage;
